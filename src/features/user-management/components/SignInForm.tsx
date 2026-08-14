"use client";

import { useState } from "react";
import { userManagementClient } from "../client";

export function SignInForm() {
  const [message, setMessage] = useState<string>();
  const [busy, setBusy] = useState(false);
  async function submit(formData: FormData) {
    setBusy(true); setMessage(undefined);
    try { await userManagementClient.signIn(String(formData.get("email")), String(formData.get("password"))); window.location.assign("/users"); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }
  return <form action={submit} className="form-stack"><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{message && <p className="error" role="alert">{message}</p>}<button className="button" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form>;
}
