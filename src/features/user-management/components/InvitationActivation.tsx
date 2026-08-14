"use client";

import Link from "next/link";
import { useState } from "react";
import { userManagementClient } from "../client";

export function InvitationActivation({ invitationId }: { invitationId: string }) {
  const [error, setError] = useState<string>(); const [complete, setComplete] = useState(false); const [busy, setBusy] = useState(false);
  async function submit(formData: FormData) { const password = String(formData.get("password")); if (password !== String(formData.get("confirmPassword"))) { setError("Passwords do not match."); return; } setBusy(true); setError(undefined); try { await userManagementClient.activateInvitation(invitationId, String(formData.get("displayName")), password); setComplete(true); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to activate account."); } finally { setBusy(false); } }
  if (complete) return <p className="success" role="status">Account activated. <Link href="/sign-in">Sign in</Link></p>;
  return <form action={submit} className="form-stack"><label>Display name<input name="displayName" autoComplete="name" required /></label><label>Password<input name="password" type="password" autoComplete="new-password" minLength={12} required /></label><label>Confirm password<input name="confirmPassword" type="password" autoComplete="new-password" minLength={12} required /></label>{error && <p className="error" role="alert">{error}</p>}<button className="button" disabled={busy}>{busy ? "Activating…" : "Register user"}</button></form>;
}
