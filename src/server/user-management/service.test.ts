import { randomBytes } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";

const demoPassword = randomBytes(24).toString("base64url");
process.env.DPM_DEMO_PASSWORD = demoPassword;

let service: typeof import("./service");

beforeAll(async () => { service = await import("./service"); });

describe("local DPM user-management service", () => {
  it("authenticates a seeded active account and rejects an incorrect password", async () => {
    const user = await service.authenticate("bsn.admin@local.dpm", demoPassword);
    expect(user.role).toBe("BSN_ADMIN");
    await expect(service.authenticate("bsn.admin@local.dpm", "incorrect-password")).rejects.toMatchObject({ status: 401 });
  });

  it("limits a Decorator Admin to its decorator users", async () => {
    const actor = await service.authenticate("decorator.admin@local.dpm", demoPassword);
    const users = await service.listManagedUsers(actor);
    expect(users).toHaveLength(1);
    expect(users.every((user) => user.decoratorId === "dec_north")).toBe(true);
    await expect(service.createInvitation(actor, { email: "not.allowed@local.dpm", role: "BSN_USER" })).rejects.toMatchObject({ status: 403 });
  });

  it("requires decorator scope for decorator invitations", async () => {
    const actor = await service.authenticate("bsn.admin@local.dpm", demoPassword);
    await expect(service.createInvitation(actor, { email: "decorator.invitee@local.dpm", role: "DECORATOR_USER" })).rejects.toMatchObject({ status: 400 });
  });

  it("allows a Decorator Admin to invite a user for its server-owned decorator scope", async () => {
    const actor = await service.authenticate("decorator.admin@local.dpm", demoPassword);
    await expect(service.createInvitation(actor, { email: "same.scope@local.dpm", role: "DECORATOR_USER" })).resolves.toMatchObject({ email: "same.scope@local.dpm" });
  });

  it("requires OTP verification before an invitation can activate an account", async () => {
    const actor = await service.authenticate("bsn.admin@local.dpm", demoPassword);
    const invitation = await service.createInvitation(actor, { email: "new.bsn.user@local.dpm", role: "BSN_USER" });
    await expect(service.activateInvitation(invitation.id, "New BSN User", "a-safe-local-password")).rejects.toMatchObject({ status: 400 });
    const message = (await service.listMockInbox(actor)).find((item) => item.id === invitation.id);
    expect(message?.otp).toMatch(/^\d{6}$/);
    await expect(service.verifyInvitationEmail(invitation.id, "000000")).rejects.toMatchObject({ status: 400 });
    await service.verifyInvitationEmail(invitation.id, message!.otp);
    const user = await service.activateInvitation(invitation.id, "New BSN User", "a-safe-local-password");
    expect(user.status).toBe("ACTIVE");
    await expect(service.authenticate("new.bsn.user@local.dpm", "a-safe-local-password")).resolves.toMatchObject({ role: "BSN_USER" });
  });

  it("rejects short passwords during activation", async () => {
    const actor = await service.authenticate("bsn.admin@local.dpm", demoPassword);
    const invitation = await service.createInvitation(actor, { email: "short.password@local.dpm", role: "BSN_USER" });
    const message = (await service.listMockInbox(actor)).find((item) => item.id === invitation.id);
    await service.verifyInvitationEmail(invitation.id, message!.otp);
    await expect(service.activateInvitation(invitation.id, "Short Password", "short")).rejects.toMatchObject({ status: 400 });
  });

  it("updates only the signed-in user's profile and password", async () => {
    const actor = await service.authenticate("bsn.user@local.dpm", demoPassword);
    const updated = await service.updateOwnProfile(actor, "Updated BSN User");
    expect(updated.displayName).toBe("Updated BSN User");
    await expect(service.changeOwnPassword(actor, "incorrect-password", "a-new-local-password")).rejects.toMatchObject({ status: 400 });
    await service.changeOwnPassword(actor, demoPassword, "a-new-local-password");
    await expect(service.authenticate("bsn.user@local.dpm", "a-new-local-password")).resolves.toMatchObject({ displayName: "Updated BSN User" });
  });

  it("locks an invitation after five invalid OTP attempts", async () => {
    const actor = await service.authenticate("bsn.admin@local.dpm", demoPassword);
    const invitation = await service.createInvitation(actor, { email: "otp.locked@local.dpm", role: "BSN_USER" });
    for (let attempt = 0; attempt < 5; attempt += 1) await expect(service.verifyInvitationEmail(invitation.id, "000000")).rejects.toMatchObject({ status: 400 });
    const message = (await service.listMockInbox(actor)).find((item) => item.id === invitation.id);
    expect(message).toBeUndefined();
  });
});
