import { InvitationVerification } from "@/features/user-management/components/InvitationVerification";

export default async function VerifyInvitationPage({ params }: { params: Promise<{ invitationId: string }> }) {
  const { invitationId } = await params;
  return <main className="public-page"><section className="auth-card"><p className="eyebrow">Invitation</p><h1>Verify your email</h1><InvitationVerification invitationId={invitationId} /></section></main>;
}
