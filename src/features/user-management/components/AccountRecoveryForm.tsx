"use client";

import { useState } from "react";
import { userManagementClient } from "../client";

export function AccountRecoveryForm() {
  const [complete, setComplete] = useState(false);
  async function submit(formData: FormData) { await userManagementClient.requestPasswordReset(String(formData.get("email"))); setComplete(true); }
  return complete ? <p className="success" role="status">If an eligible account exists, password-reset instructions have been prepared.</p> : <form action={submit} className="form-stack"><label>Email<input name="email" type="email" autoComplete="email" required /></label><button className="button">Request reset</button></form>;
}
