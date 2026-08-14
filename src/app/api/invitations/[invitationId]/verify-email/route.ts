import { NextResponse } from "next/server";
import { apiError, jsonBody } from "@/server/http";
import { AppError } from "@/server/user-management/domain";
import { verifyInvitationEmail } from "@/server/user-management/service";

export async function POST(request: Request, { params }: { params: Promise<{ invitationId: string }> }) {
  try { const body = await jsonBody(request); const otp = typeof body.otp === "string" ? body.otp : ""; if (!/^\d{6}$/.test(otp)) throw new AppError(400, "A six-digit verification code is required."); await verifyInvitationEmail((await params).invitationId, otp); return NextResponse.json({ verified: true }); } catch (error) { return apiError(error); }
}
