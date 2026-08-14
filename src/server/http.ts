import { NextResponse } from "next/server";
import { AppError } from "@/server/user-management/domain";

export function apiError(error: unknown) {
  if (error instanceof AppError) return NextResponse.json({ error: error.message }, { status: error.status });
  if (error instanceof Error && error.message === "Local DPM demo password is not configured.") return NextResponse.json({ error: "Local demo configuration is incomplete." }, { status: 503 });
  return NextResponse.json({ error: "The request could not be completed." }, { status: 500 });
}

export async function jsonBody(request: Request): Promise<Record<string, unknown>> {
  try { return await request.json() as Record<string, unknown>; } catch { throw new AppError(400, "A valid JSON request body is required."); }
}
