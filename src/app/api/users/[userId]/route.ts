import { NextResponse } from "next/server";
import { apiError, jsonBody } from "@/server/http";
import { AppError, type Permission, type UserStatus } from "@/server/user-management/domain";
import { getCurrentUser, getManagedUser, updateManagedUser } from "@/server/user-management/service";

const statuses = new Set<UserStatus>(["ACTIVE", "DEACTIVATED", "LOCKED"]);
const permissions = new Set<Permission>(["MANAGE_BSN_USERS", "MANAGE_DECORATOR_ADMINS", "MANAGE_DECORATOR_USERS"]);
export async function GET(_: Request, { params }: { params: Promise<{ userId: string }> }) {
  try { const user = await getManagedUser(await getCurrentUser(), (await params).userId); return NextResponse.json({ user: { id: user.id, displayName: user.displayName, role: user.role, status: user.status, permissions: user.permissions } }); } catch (error) { return apiError(error); }
}
export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try { const body = await jsonBody(request); const status = typeof body.status === "string" && statuses.has(body.status as UserStatus) ? body.status as UserStatus : undefined; const assigned = Array.isArray(body.permissions) && body.permissions.every((item) => typeof item === "string" && permissions.has(item as Permission)) ? body.permissions as Permission[] : undefined; if (!status && !assigned) throw new AppError(400, "A valid status or permission set is required."); const user = await updateManagedUser(await getCurrentUser(), (await params).userId, { status, permissions: assigned }); return NextResponse.json({ user: { id: user.id, status: user.status, permissions: user.permissions } }); } catch (error) { return apiError(error); }
}
