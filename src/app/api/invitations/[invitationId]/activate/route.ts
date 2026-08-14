import { NextResponse } from "next/server";
import { apiError, jsonBody } from "@/server/http";
import { AppError } from "@/server/user-management/domain";
import { activateInvitation } from "@/server/user-management/service";

export async function POST(request: Request, { params }: { params: Promise<{ invitationId: string }> }) {
  try { const body = await jsonBody(request); const displayName = typeof body.displayName === "string" ? body.displayName.trim() : ""; const password = typeof body.password === "string" ? body.password : ""; if (!displayName) throw new AppError(400, "Display name is required."); const user = await activateInvitation((await params).invitationId, displayName, password); return NextResponse.json({ user: { id: user.id, displayName: user.displayName, role: user.role } }, { status: 201 }); } catch (error) { return apiError(error); }
}
