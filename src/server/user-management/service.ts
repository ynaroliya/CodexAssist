import { randomBytes, randomInt, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { audit } from "@/server/audit/audit";
import { mockDecoratorName, mockUserManagementRepository } from "@/server/adapters/mock/user-management-repository";
import type { UserManagementRepository } from "@/server/repositories/user-management-repository";
import { AppError, type UserRecord, type UserRole } from "./domain";

const repository: UserManagementRepository = mockUserManagementRepository;

export async function authenticate(email: string, password: string) {
  const user = await repository.findUserByEmail(email);
  if (!user || user.status !== "ACTIVE") throw new AppError(401, "Invalid email or password.");
  const actual = scryptSync(password, user.passwordSalt, 64).toString("hex");
  if (!timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(user.passwordHash, "hex"))) throw new AppError(401, "Invalid email or password.");
  await audit(repository, user.id, "AUTHENTICATED", user.id);
  return user;
}

export async function getCurrentUser() {
  const { readSessionUserId } = await import("@/server/auth/session");
  const id = await readSessionUserId();
  if (!id) throw new AppError(401, "Authentication is required.");
  const user = await repository.findUserById(id);
  if (!user || user.status !== "ACTIVE") throw new AppError(401, "Authentication is required.");
  return user;
}

function permissionFor(role: UserRole) { return role === "BSN_ADMIN" || role === "BSN_USER" ? "MANAGE_BSN_USERS" : role === "DECORATOR_ADMIN" ? "MANAGE_DECORATOR_ADMINS" : "MANAGE_DECORATOR_USERS"; }
function canManageUsers(actor: UserRecord) { return actor.permissions.some((permission) => permission === "MANAGE_BSN_USERS" || permission === "MANAGE_DECORATOR_USERS" || permission === "MANAGE_DECORATOR_ADMINS"); }
function canManageTarget(actor: UserRecord, target: UserRecord | { role: UserRole; decoratorId?: string }) { return actor.permissions.includes(permissionFor(target.role)) && (actor.role !== "DECORATOR_ADMIN" || target.decoratorId === actor.decoratorId); }

export function canManageUserAdministration(actor: UserRecord) { return canManageUsers(actor); }

export async function listManagedUsers(actor: UserRecord) {
  if (!canManageUsers(actor)) throw new AppError(403, "You do not have permission to view user administration.");
  const users = await repository.listUsers();
  return users.filter((user) => canManageTarget(actor, user));
}

export async function createInvitation(actor: UserRecord, input: { email: string; role: UserRole; decoratorId?: string }) {
  if (!canManageUsers(actor)) throw new AppError(403, "You do not have permission to invite users.");
  const isDecoratorAdmin = actor.role === "DECORATOR_ADMIN";
  const decoratorId = isDecoratorAdmin ? actor.decoratorId : input.decoratorId;
  if (!canManageTarget(actor, { role: input.role, decoratorId })) throw new AppError(403, "You do not have permission to invite this user type.");
  if ((input.role === "DECORATOR_ADMIN" || input.role === "DECORATOR_USER") && !decoratorId) throw new AppError(400, "A decorator is required for decorator accounts.");
  if (decoratorId && !mockDecoratorName(decoratorId)) throw new AppError(400, "The selected decorator does not exist.");
  if (await repository.findUserByEmail(input.email)) throw new AppError(409, "An account already exists for this email.");
  const invitation = { id: randomUUID(), email: input.email.toLowerCase(), role: input.role, decoratorId, createdBy: actor.id, otp: randomInt(100000, 1000000).toString(), expiresAt: new Date(Date.now() + 15 * 60 * 1000), status: "PENDING" as const, otpAttempts: 0 };
  await repository.saveInvitation(invitation);
  await audit(repository, actor.id, "INVITATION_CREATED", invitation.id);
  return { id: invitation.id, email: invitation.email, expiresAt: invitation.expiresAt.toISOString() };
}

export async function getManagedUser(actor: UserRecord, userId: string) {
  const target = await repository.findUserById(userId);
  if (!target || !canManageTarget(actor, target)) throw new AppError(403, "You do not have permission to view this user.");
  return target;
}

export async function requestPasswordReset(email: string) {
  const user = await repository.findUserByEmail(email);
  if (user) await audit(repository, user.id, "PASSWORD_RESET_REQUESTED", user.id);
}

export async function updateOwnProfile(actor: UserRecord, displayName: string) {
  if (displayName.length < 2 || displayName.length > 100) throw new AppError(400, "Display name must contain between 2 and 100 characters.");
  actor.displayName = displayName;
  await repository.updateUser(actor);
  await audit(repository, actor.id, "ACCOUNT_PROFILE_UPDATED", actor.id);
  return actor;
}

export async function changeOwnPassword(actor: UserRecord, currentPassword: string, newPassword: string) {
  if (newPassword.length < 12) throw new AppError(400, "Password must contain at least 12 characters.");
  const currentHash = scryptSync(currentPassword, actor.passwordSalt, 64).toString("hex");
  if (!timingSafeEqual(Buffer.from(currentHash, "hex"), Buffer.from(actor.passwordHash, "hex"))) throw new AppError(400, "Current password is incorrect.");
  const salt = randomBytes(16).toString("hex");
  actor.passwordSalt = salt;
  actor.passwordHash = scryptSync(newPassword, salt, 64).toString("hex");
  await repository.updateUser(actor);
  await audit(repository, actor.id, "ACCOUNT_PASSWORD_CHANGED", actor.id);
}

export async function updateManagedUser(actor: UserRecord, userId: string, input: { status?: UserRecord["status"]; permissions?: UserRecord["permissions"] }) {
  const target = await repository.findUserById(userId);
  if (!target || !canManageTarget(actor, target)) throw new AppError(403, "You do not have permission to manage this user.");
  if (target.id === actor.id && input.status && input.status !== "ACTIVE") throw new AppError(400, "You cannot deactivate or lock your own account.");
  if (input.status && !["ACTIVE", "DEACTIVATED", "LOCKED"].includes(input.status)) throw new AppError(400, "Invalid lifecycle status.");
  if (input.permissions) {
    const assignable = input.permissions.every((permission) => actor.permissions.includes(permission));
    if (!assignable) throw new AppError(403, "You cannot grant permissions you do not hold.");
    target.permissions = input.permissions;
  }
  if (input.status) target.status = input.status;
  await repository.updateUser(target);
  await audit(repository, actor.id, "USER_MANAGED", target.id);
  return target;
}

export async function listMockInbox(actor: UserRecord) {
  if (!canManageUsers(actor)) throw new AppError(403, "You do not have permission to view local invitation messages.");
  return (await repository.listInvitationsCreatedBy(actor.id)).filter((invitation) => invitation.status === "PENDING").map(({ id, email, role, otp, expiresAt }) => ({ id, email, role, otp, expiresAt: expiresAt.toISOString() }));
}

export async function verifyInvitationEmail(invitationId: string, otp: string) {
  const invitation = await repository.findInvitationById(invitationId);
  if (!invitation || invitation.status !== "PENDING" || invitation.expiresAt < new Date()) throw new AppError(400, "The invitation or verification code is invalid or expired.");
  if (invitation.otp !== otp) { invitation.otpAttempts += 1; if (invitation.otpAttempts >= 5) invitation.status = "LOCKED"; throw new AppError(400, "The invitation or verification code is invalid or expired."); }
  invitation.status = "VERIFIED";
  await audit(repository, invitation.createdBy, "INVITATION_EMAIL_VERIFIED", invitation.id);
}

export async function activateInvitation(invitationId: string, displayName: string, password: string) {
  const invitation = await repository.findInvitationById(invitationId);
  if (!invitation || invitation.status !== "VERIFIED") throw new AppError(400, "Email verification is required before account activation.");
  if (displayName.length < 2 || displayName.length > 100) throw new AppError(400, "Display name must contain between 2 and 100 characters.");
  if (password.length < 12) throw new AppError(400, "Password must contain at least 12 characters.");
  if (await repository.findUserByEmail(invitation.email)) throw new AppError(409, "An account already exists for this email.");
  const salt = randomBytes(16).toString("hex");
  const user: UserRecord = { id: randomUUID(), displayName, email: invitation.email, role: invitation.role, status: "ACTIVE", decoratorId: invitation.decoratorId, decoratorName: invitation.decoratorId ? mockDecoratorName(invitation.decoratorId) : undefined, permissions: invitation.role === "BSN_ADMIN" ? ["MANAGE_BSN_USERS", "MANAGE_DECORATOR_ADMINS", "MANAGE_DECORATOR_USERS"] : invitation.role === "DECORATOR_ADMIN" ? ["MANAGE_DECORATOR_USERS"] : [], passwordSalt: salt, passwordHash: scryptSync(password, salt, 64).toString("hex") };
  await repository.createUser(user);
  await audit(repository, user.id, "ACCOUNT_ACTIVATED", user.id);
  return user;
}
