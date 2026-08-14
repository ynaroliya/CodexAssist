import { InvitationActivation } from "@/features/user-management/components/InvitationActivation";

export default async function ActivateInvitationPage({ params }: { params: Promise<{ invitationId: string }> }) {
  const { invitationId } = await params;
  return <main className="public-page"><section className="auth-card"><p className="eyebrow">Invitation</p><h1>Register user</h1><InvitationActivation invitationId={invitationId} /></section></main>;
}
