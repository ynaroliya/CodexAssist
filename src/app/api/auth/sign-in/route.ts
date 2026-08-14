import { NextResponse } from "next/server";
import { createSession } from "@/server/auth/session";
import { apiError, jsonBody } from "@/server/http";
import { authenticate } from "@/server/user-management/service";

export async function POST(request: Request) {
  try { const body = await jsonBody(request); const email = typeof body.email === "string" ? body.email.trim() : ""; const password = typeof body.password === "string" ? body.password : ""; if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 }); const user = await authenticate(email, password); await createSession(user.id); return NextResponse.json({ user: { id: user.id, displayName: user.displayName, role: user.role } }); } catch (error) { return apiError(error); }
}
