import { randomUUID } from "node:crypto";
import type { UserManagementRepository } from "@/server/repositories/user-management-repository";

export async function audit(repository: UserManagementRepository, actorId: string, action: string, subjectId?: string) {
  await repository.appendAudit({ actorId, action, subjectId, correlationId: randomUUID() });
}
