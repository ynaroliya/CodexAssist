import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const sessionStore = new Map<string, { userId: string; expiresAt: number }>();
const signingKey = process.env.DPM_SESSION_SECRET || randomBytes(32).toString("hex");
const cookieName = "dpm_local_session";
const maxAgeSeconds = 60 * 60 * 8;

function signature(value: string) { return createHmac("sha256", signingKey).update(value).digest("base64url"); }

export async function createSession(userId: string) {
  const id = randomBytes(32).toString("base64url");
  sessionStore.set(id, { userId, expiresAt: Date.now() + maxAgeSeconds * 1000 });
  const store = await cookies();
  store.set(cookieName, `${id}.${signature(id)}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: maxAgeSeconds });
}

export async function readSessionUserId(): Promise<string | undefined> {
  const raw = (await cookies()).get(cookieName)?.value;
  if (!raw) return undefined;
  const separator = raw.lastIndexOf(".");
  if (separator < 1) return undefined;
  const id = raw.slice(0, separator); const supplied = raw.slice(separator + 1); const expected = signature(id);
  if (supplied.length !== expected.length || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return undefined;
  const session = sessionStore.get(id);
  if (!session || session.expiresAt < Date.now()) { sessionStore.delete(id); return undefined; }
  return session.userId;
}

export async function destroySession() {
  const raw = (await cookies()).get(cookieName)?.value;
  const id = raw?.split(".")[0];
  if (id) sessionStore.delete(id);
  (await cookies()).delete(cookieName);
}
