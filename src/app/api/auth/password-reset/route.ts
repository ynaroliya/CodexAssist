import { NextResponse } from "next/server";
import { apiError, jsonBody } from "@/server/http";
import { requestPasswordReset } from "@/server/user-management/service";

export async function POST(request: Request) {
  try { const body = await jsonBody(request); const email = typeof body.email === "string" ? body.email.trim() : ""; if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 }); await requestPasswordReset(email); return NextResponse.json({ accepted: true }); } catch (error) { return apiError(error); }
}
