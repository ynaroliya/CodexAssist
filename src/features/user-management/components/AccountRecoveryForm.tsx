"use client";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useState } from "react";
import { userManagementClient } from "../client";
export function AccountRecoveryForm() { const [complete, setComplete] = useState(false); async function submit(data: FormData) { await userManagementClient.requestPasswordReset(String(data.get("email"))); setComplete(true); } return complete ? <p className="success" role="status">If an eligible account exists, password-reset instructions have been prepared.</p> : <form action={submit} className="form-stack"><TextField label="Email" name="email" type="email" autoComplete="email" required /><Button type="submit">Request reset</Button></form>; }
