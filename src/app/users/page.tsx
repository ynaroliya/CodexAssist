import { UserManagementWorkspace } from "@/features/user-management/components/UserManagementWorkspace";
import { redirect } from "next/navigation";
import { canManageUserAdministration, getCurrentUser } from "@/server/user-management/service";

export default async function UsersPage() {
  const actor = await getCurrentUser().catch(() => undefined);
  if (!actor) redirect("/sign-in");
  if (!canManageUserAdministration(actor)) redirect("/account");
  return <UserManagementWorkspace actorRole={actor.role} />;
}
