export type UserRole = "BSN_ADMIN" | "BSN_USER" | "DECORATOR_ADMIN" | "DECORATOR_USER";
export type UserStatus = "INVITED" | "ACTIVE" | "DEACTIVATED" | "LOCKED";
export type Permission = "MANAGE_BSN_USERS" | "MANAGE_DECORATOR_USERS" | "MANAGE_DECORATOR_ADMINS";

export interface UserRecord {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  decoratorId?: string;
  decoratorName?: string;
  permissions: Permission[];
  passwordSalt: string;
  passwordHash: string;
}

export interface InvitationRecord {
  id: string;
  email: string;
  role: UserRole;
  decoratorId?: string;
  createdBy: string;
  otp: string;
  expiresAt: Date;
  status: "PENDING" | "VERIFIED" | "CANCELLED" | "EXPIRED" | "LOCKED";
  otpAttempts: number;
}

export class AppError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}
