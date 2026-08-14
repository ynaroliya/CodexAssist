export type UserRole = "BSN_ADMIN" | "BSN_USER" | "DECORATOR_ADMIN" | "DECORATOR_USER";
export type UserStatus = "INVITED" | "ACTIVE" | "DEACTIVATED" | "LOCKED";

export interface ManagedUser {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  decoratorName?: string;
}

export interface UserListResponse { users: ManagedUser[]; }
export interface CreateInvitationRequest { email: string; role: UserRole; decoratorId?: string; }
export interface InvitationResponse { invitation: { id: string; email: string; expiresAt: string }; }
export interface MockInboxResponse { messages: Array<{ id: string; email: string; role: UserRole; otp: string; expiresAt: string }>; }
export interface AccountResponse { user: { id: string; displayName: string; email: string; role: UserRole }; }
