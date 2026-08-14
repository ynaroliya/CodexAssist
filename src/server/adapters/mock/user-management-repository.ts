import { randomBytes, scryptSync } from "node:crypto";
import type { UserManagementRepository } from "@/server/repositories/user-management-repository";
import type { InvitationRecord, Permission, UserRecord, UserRole } from "@/server/user-management/domain";

const demoPassword = process.env.DPM_DEMO_PASSWORD;
const users: UserRecord[] = [];
const invitations: InvitationRecord[] = [];
const auditEvents: Array<{ actorId: string; action: string; subjectId?: string; correlationId: string; occurredAt: Date }> = [];
const decorators = new Map([["dec_north", "Northstar Decorators"], ["dec_south", "Southside Decorators"]]);

function passwordMaterial() {
  if (!demoPassword || demoPassword.length < 12) throw new Error("Local DPM demo password is not configured.");
  const salt = randomBytes(16).toString("hex");
  return { passwordSalt: salt, passwordHash: scryptSync(demoPassword, salt, 64).toString("hex") };
}

function permissionsFor(role: UserRole): Permission[] {
  if (role === "BSN_ADMIN") return ["MANAGE_BSN_USERS", "MANAGE_DECORATOR_ADMINS", "MANAGE_DECORATOR_USERS"];
  if (role === "DECORATOR_ADMIN") return ["MANAGE_DECORATOR_USERS"];
  return [];
}

function initializeUsers() {
  if (users.length) return;
  const create = (id: string, displayName: string, email: string, role: UserRole, decorator?: { id: string; name: string }) => users.push({ id, displayName, email, role, status: "ACTIVE", decoratorId: decorator?.id, decoratorName: decorator?.name, permissions: permissionsFor(role), ...passwordMaterial() });
  create("usr_bsn_admin", "Avery BSN Admin", "bsn.admin@local.dpm", "BSN_ADMIN");
  create("usr_bsn_user", "Bailey BSN User", "bsn.user@local.dpm", "BSN_USER");
  create("usr_decorator_admin", "Casey Decorator Admin", "decorator.admin@local.dpm", "DECORATOR_ADMIN", { id: "dec_north", name: "Northstar Decorators" });
  create("usr_decorator_user", "Devon Decorator User", "decorator.user@local.dpm", "DECORATOR_USER", { id: "dec_north", name: "Northstar Decorators" });
}

export const mockUserManagementRepository: UserManagementRepository = {
  async findUserByEmail(email) { initializeUsers(); return users.find((user) => user.email.toLowerCase() === email.toLowerCase()); },
  async findUserById(id) { initializeUsers(); return users.find((user) => user.id === id); },
  async listUsers() { initializeUsers(); return users; },
  async createUser(user) { initializeUsers(); users.push(user); },
  async updateUser() { initializeUsers(); },
  async saveInvitation(invitation) { initializeUsers(); invitations.push(invitation); },
  async findInvitationById(id) { return invitations.find((invitation) => invitation.id === id); },
  async listInvitationsCreatedBy(userId) { return invitations.filter((invitation) => invitation.createdBy === userId); },
  async appendAudit(event) { auditEvents.push({ ...event, occurredAt: new Date() }); },
};

export function mockDecoratorName(id: string) { return decorators.get(id); }
