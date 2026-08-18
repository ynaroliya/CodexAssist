"use client";

import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useState } from "react";
import { userManagementClient } from "../client";

export function SignInForm() {
  const [message, setMessage] = useState<string>();
  const [busy, setBusy] = useState(false);
  async function submit(formData: FormData) { setBusy(true); setMessage(undefined); try { await userManagementClient.signIn(String(formData.get("email")), String(formData.get("password"))); window.location.assign("/users"); } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to sign in."); } finally { setBusy(false); } }
  return <form action={submit} className="form-stack"><TextField label="Email" name="email" type="email" autoComplete="email" required /><TextField label="Password" name="password" type="password" autoComplete="current-password" required />{message && <p className="error" role="alert">{message}</p>}<Button type="submit" loading={busy} loadingLabel="Signing in">Sign in</Button></form>;
}
