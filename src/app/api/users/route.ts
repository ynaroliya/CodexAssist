import { NextResponse } from "next/server";
import { apiError } from "@/server/http";
import { getCurrentUser, listManagedUsers } from "@/server/user-management/service";

export async function GET() {
  try { const actor = await getCurrentUser(); const users = await listManagedUsers(actor); return NextResponse.json({ users: users.map(({ passwordHash, passwordSalt, permissions, ...user }) => user) }); } catch (error) { return apiError(error); }
}
