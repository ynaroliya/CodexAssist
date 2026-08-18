"use client";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import Link from "next/link";
import { useState } from "react";
import { userManagementClient } from "../client";
export function InvitationVerification({ invitationId }: { invitationId: string }) { const [error, setError] = useState<string>(); const [verified, setVerified] = useState(false); const [busy, setBusy] = useState(false); async function submit(data: FormData) { setBusy(true); setError(undefined); try { await userManagementClient.verifyInvitationEmail(invitationId, String(data.get("otp"))); setVerified(true); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to verify email."); } finally { setBusy(false); } } if (verified) return <p className="success" role="status">Email verified. <Link href={`/invitation/${invitationId}/activate`}>Register user</Link></p>; return <form action={submit} className="form-stack"><TextField label="Six-digit verification code" name="otp" inputMode="numeric" pattern="[0-9]{6}" autoComplete="one-time-code" required />{error && <p className="error" role="alert">{error}</p>}<Button type="submit" loading={busy} loadingLabel="Verifying">Verify email</Button></form>; }
