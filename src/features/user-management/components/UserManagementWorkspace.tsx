"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import type { ManagedUser, UserRole } from "@/shared/contracts/user-management";
import { userManagementClient } from "../client";

const roles: UserRole[] = ["BSN_ADMIN", "BSN_USER", "DECORATOR_ADMIN", "DECORATOR_USER"];

export function UserManagementWorkspace({ actorRole }: { actorRole: UserRole }) {
  const [users, setUsers] = useState<ManagedUser[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<string>(); const [activeTab, setActiveTab] = useState("team");
  useEffect(() => { userManagementClient.listUsers().then((data) => setUsers(data.users)).catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "Unable to load users.")).finally(() => setLoading(false)); }, []);
  const filtered = users.filter((user) => activeTab === "team" ? user.role.startsWith("BSN") : !user.role.startsWith("BSN"));
  return <main className="app-shell"><header className="app-header"><div><p className="eyebrow">DPM / Administration</p><h1>Users &amp; Access</h1></div><a className="text-link" href="/account">My profile</a></header><section className="panel" aria-label="User management"><div className="tabs" role="tablist" aria-label="User category"><button role="tab" aria-selected={activeTab === "team"} onClick={() => setActiveTab("team")}>BSN Team</button><button role="tab" aria-selected={activeTab === "accounts"} onClick={() => setActiveTab("accounts")}>Decorator Accounts</button></div><InvitationForm actorRole={actorRole} /><MockInbox /><UserTable users={filtered} loading={loading} error={error} /></section></main>;
}

function InvitationForm({ actorRole }: { actorRole: UserRole }) {
  const assignableRoles = actorRole === "DECORATOR_ADMIN" ? ["DECORATOR_USER"] as UserRole[] : roles;
  const [message, setMessage] = useState<string>(); const [invitationId, setInvitationId] = useState<string>(); const [role, setRole] = useState<UserRole>(assignableRoles[0]);
  async function submit(formData: FormData) { try { const response = await userManagementClient.createInvitation({ email: String(formData.get("email")), role, decoratorId: role.startsWith("DECORATOR") && actorRole !== "DECORATOR_ADMIN" ? String(formData.get("decoratorId")) : undefined }); setInvitationId(response.invitation.id); setMessage("Invitation created. Retrieve the local verification code below."); } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Unable to create invitation."); } }
  return <form action={submit} className="invite-form"><TextField label="Email" name="email" type="email" required /><label>Role<select name="role" value={role} onChange={(event) => setRole(event.target.value as UserRole)}>{assignableRoles.map((item) => <option key={item}>{item}</option>)}</select></label>{role.startsWith("DECORATOR") && actorRole !== "DECORATOR_ADMIN" && <TextField label="Decorator ID" name="decoratorId" required placeholder="dec_north" />}<Button type="submit">Invite user</Button>{message && <p className="success" role="status">{message}{invitationId && <> <Link href={`/invitation/${invitationId}/verify`}>Open verification</Link></>}</p>}</form>;
}

function MockInbox() {
  const [messages, setMessages] = useState<Array<{ id: string; email: string; otp: string; expiresAt: string }>>([]); const [error, setError] = useState<string>();
  async function load() { try { setError(undefined); setMessages((await userManagementClient.listMockInbox()).messages); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to open local inbox."); } }
  return <section className="mock-inbox" aria-labelledby="mock-inbox-title"><div><h2 id="mock-inbox-title">Local mock inbox</h2><p>Use this local-only testing aid instead of email delivery.</p></div><Button type="button" variant="secondary" onClick={load}>Refresh inbox</Button>{error && <p className="error" role="alert">{error}</p>}{messages.length > 0 && <ul>{messages.map((message) => <li key={message.id}><strong>{message.email}</strong><span>Code: {message.otp} · expires {new Date(message.expiresAt).toLocaleTimeString()}</span></li>)}</ul>}</section>;
}

function UserTable({ users, loading, error }: { users: ManagedUser[]; loading: boolean; error?: string }) {
  if (loading) return <p role="status">Loading users…</p>;
  if (error) return <p className="error" role="alert">{error}</p>;
  if (!users.length) return <p className="empty">No users match this view.</p>;
  return <div className="table-wrap"><table><thead><tr><th>Name</th><th>Role</th><th>Decorator</th><th>Status</th><th>Actions</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td>{user.displayName}<span>{user.email}</span></td><td>{user.role}</td><td>{user.decoratorName ?? "Enterprise"}</td><td><span className="status">{user.status}</span></td><td><UserActions user={user} /></td></tr>)}</tbody></table></div>;
}

function UserActions({ user }: { user: ManagedUser }) {
  const [permissions, setPermissions] = useState<string[]>();
  async function showPermissions() { setPermissions((await userManagementClient.getManagedUser(user.id)).user.permissions); }
  async function toggle(permission: string) { const next = (permissions ?? []).includes(permission) ? (permissions ?? []).filter((item) => item !== permission) : [...(permissions ?? []), permission]; await userManagementClient.manageUser(user.id, { permissions: next }); setPermissions(next); }
  return <><Button type="button" variant="tertiary" onClick={() => userManagementClient.manageUser(user.id, { status: user.status === "ACTIVE" ? "DEACTIVATED" : "ACTIVE" }).then(() => window.location.reload())}>{user.status === "ACTIVE" ? "Deactivate" : "Reactivate"}</Button><Button type="button" variant="tertiary" onClick={showPermissions}>Permissions</Button>{permissions && <fieldset><legend>{user.displayName} permissions</legend>{["MANAGE_BSN_USERS", "MANAGE_DECORATOR_ADMINS", "MANAGE_DECORATOR_USERS"].map((permission) => <label key={permission}><input type="checkbox" checked={permissions.includes(permission)} onChange={() => toggle(permission)} />{permission}</label>)}</fieldset>}</>;
}
