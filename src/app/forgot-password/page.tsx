import { AccountRecoveryForm } from "@/features/user-management/components/AccountRecoveryForm";

export default function ForgotPasswordPage() {
  return <main className="public-page"><section className="auth-card"><p className="eyebrow">Account recovery</p><h1>Reset your password</h1><AccountRecoveryForm /></section></main>;
}
