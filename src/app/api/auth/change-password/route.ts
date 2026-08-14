import { NextResponse } from "next/server";
import { apiError, jsonBody } from "@/server/http";
import { AppError } from "@/server/user-management/domain";
import { changeOwnPassword, getCurrentUser } from "@/server/user-management/service";

export async function POST(request: Request) {
  try { const body = await jsonBody(request); const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : ""; const newPassword = typeof body.newPassword === "string" ? body.newPassword : ""; if (!currentPassword || !newPassword) throw new AppError(400, "Current and new passwords are required."); await changeOwnPassword(await getCurrentUser(), currentPassword, newPassword); return NextResponse.json({ changed: true }); } catch (error) { return apiError(error); }
}
