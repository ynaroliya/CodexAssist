import type { InvitationRecord, UserRecord } from "@/server/user-management/domain";

export interface UserManagementRepository {
  findUserByEmail(email: string): Promise<UserRecord | undefined>;
  findUserById(id: string): Promise<UserRecord | undefined>;
  listUsers(): Promise<UserRecord[]>;
  createUser(user: UserRecord): Promise<void>;
  updateUser(user: UserRecord): Promise<void>;
  saveInvitation(invitation: InvitationRecord): Promise<void>;
  findInvitationById(id: string): Promise<InvitationRecord | undefined>;
  listInvitationsCreatedBy(userId: string): Promise<InvitationRecord[]>;
  appendAudit(event: { actorId: string; action: string; subjectId?: string; correlationId: string }): Promise<void>;
}
