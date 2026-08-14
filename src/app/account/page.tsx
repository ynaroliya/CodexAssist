import { AccountSettings } from "@/features/user-management/components/AccountSettings";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/user-management/service";

export default async function AccountPage() {
  try { await getCurrentUser(); } catch { redirect("/sign-in"); }
  return <AccountSettings />;
}
