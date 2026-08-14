import { NextResponse } from "next/server";
import { apiError, jsonBody } from "@/server/http";
import { AppError } from "@/server/user-management/domain";
import { getCurrentUser, updateOwnProfile } from "@/server/user-management/service";

function accountDto(user: Awaited<ReturnType<typeof getCurrentUser>>) { return { id: user.id, displayName: user.displayName, email: user.email, role: user.role }; }

export async function GET() {
  try { return NextResponse.json({ user: accountDto(await getCurrentUser()) }); } catch (error) { return apiError(error); }
}

export async function PATCH(request: Request) {
  try { const body = await jsonBody(request); const displayName = typeof body.displayName === "string" ? body.displayName.trim() : ""; if (!displayName) throw new AppError(400, "Display name is required."); return NextResponse.json({ user: accountDto(await updateOwnProfile(await getCurrentUser(), displayName)) }); } catch (error) { return apiError(error); }
}
