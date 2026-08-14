import Link from "next/link";

export default function HomePage() {
  return (
    <main className="public-page">
      <section className="auth-card" aria-labelledby="welcome-title">
        <p className="eyebrow">Decorator Profile Manager</p>
        <h1 id="welcome-title">User management foundation</h1>
        <p>Use a local seeded account to explore the governed user-management experience.</p>
        <Link className="button" href="/sign-in">Sign in</Link>
      </section>
    </main>
  );
}
