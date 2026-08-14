import Link from "next/link";
import { SignInForm } from "@/features/user-management/components/SignInForm";

export default function SignInPage() {
  return (
    <main className="public-page">
      <section className="auth-card" aria-labelledby="sign-in-title">
        <p className="eyebrow">Decorator Profile Manager</p>
        <h1 id="sign-in-title">Sign in</h1>
        <SignInForm />
        <Link className="text-link" href="/forgot-password">Forgot your password?</Link>
      </section>
    </main>
  );
}
