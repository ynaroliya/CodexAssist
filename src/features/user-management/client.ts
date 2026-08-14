import type { AccountResponse, CreateInvitationRequest, InvitationResponse, MockInboxResponse, UserListResponse } from "@/shared/contracts/user-management";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, headers: { "content-type": "application/json", ...init?.headers } });
  if (!response.ok) throw new Error("We could not complete that request. Please try again.");
  return response.json() as Promise<T>;
}

export const userManagementClient = {
  listUsers: () => request<UserListResponse>("/api/users"),
  createInvitation: (input: CreateInvitationRequest) => request<InvitationResponse>("/api/invitations", { method: "POST", body: JSON.stringify(input) }),
  signIn: (email: string, password: string) => request("/api/auth/sign-in", { method: "POST", body: JSON.stringify({ email, password }) }),
  requestPasswordReset: (email: string) => request("/api/auth/password-reset", { method: "POST", body: JSON.stringify({ email }) }),
  listMockInbox: () => request<MockInboxResponse>("/api/mock-inbox"),
  verifyInvitationEmail: (invitationId: string, otp: string) => request(`/api/invitations/${invitationId}/verify-email`, { method: "POST", body: JSON.stringify({ otp }) }),
  activateInvitation: (invitationId: string, displayName: string, password: string) => request(`/api/invitations/${invitationId}/activate`, { method: "POST", body: JSON.stringify({ displayName, password }) }),
  getAccount: () => request<AccountResponse>("/api/account"),
  updateAccount: (displayName: string) => request<AccountResponse>("/api/account", { method: "PATCH", body: JSON.stringify({ displayName }) }),
  changePassword: (currentPassword: string, newPassword: string) => request("/api/auth/change-password", { method: "POST", body: JSON.stringify({ currentPassword, newPassword }) }),
  manageUser: (userId: string, input: { status?: string; permissions?: string[] }) => request(`/api/users/${userId}`, { method: "PATCH", body: JSON.stringify(input) }),
  getManagedUser: (userId: string) => request<{ user: { id: string; permissions: string[] } }>(`/api/users/${userId}`),
};
