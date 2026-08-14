import { NextResponse } from "next/server";
import { apiError, jsonBody } from "@/server/http";
import { AppError, type UserRole } from "@/server/user-management/domain";
import { createInvitation, getCurrentUser } from "@/server/user-management/service";

const roles = new Set<UserRole>(["BSN_ADMIN", "BSN_USER", "DECORATOR_ADMIN", "DECORATOR_USER"]);

export async function POST(request: Request) {
  try { const body = await jsonBody(request); const email = typeof body.email === "string" ? body.email.trim() : ""; const role = body.role; const decoratorId = typeof body.decoratorId === "string" ? body.decoratorId : undefined; if (!email || typeof role !== "string" || !roles.has(role as UserRole)) throw new AppError(400, "A valid email and role are required."); const actor = await getCurrentUser(); const invitation = await createInvitation(actor, { email, role: role as UserRole, decoratorId }); return NextResponse.json({ invitation }, { status: 201 }); } catch (error) { return apiError(error); }
}
