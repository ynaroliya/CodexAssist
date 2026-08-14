import { NextResponse } from "next/server";
import { apiError } from "@/server/http";
import { getCurrentUser, listMockInbox } from "@/server/user-management/service";

export async function GET() {
  try { return NextResponse.json({ messages: await listMockInbox(await getCurrentUser()) }); } catch (error) { return apiError(error); }
}
