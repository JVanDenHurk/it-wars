/*
  Warnings:

  - The values [TICKET_STORM] on the enum `PvPAttackType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "PoisonEffect" AS ENUM ('NONE', 'QUEUE_SPEED', 'SLA_PRESSURE', 'VALUE_DECAY', 'RESOLUTION_PENALTY', 'MONITORING_FAILURE', 'BOUNCE_FAILURE', 'ABANDONMENT_PENALTY', 'EXECUTIVE_ESCALATION', 'MAIL_BACKLOG');

-- AlterEnum
BEGIN;
CREATE TYPE "PvPAttackType_new" AS ENUM ('PASSWORD_RESET_FLOOD', 'SELF_SERVICE_PORTAL_OUTAGE', 'NETWORK_OUTAGE', 'FAILED_DEPLOYMENT', 'PHISHING_CAMPAIGN', 'MONITORING_FAILURE', 'DNS_FAILURE', 'MAJOR_INCIDENT', 'EXECUTIVE_ESCALATION', 'MAIL_QUEUE_BACKLOG');
ALTER TABLE "PvPAttack" ALTER COLUMN "type" TYPE "PvPAttackType_new" USING ("type"::text::"PvPAttackType_new");
ALTER TYPE "PvPAttackType" RENAME TO "PvPAttackType_old";
ALTER TYPE "PvPAttackType_new" RENAME TO "PvPAttackType";
DROP TYPE "public"."PvPAttackType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "isPoison" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "poisonEffect" "PoisonEffect" NOT NULL DEFAULT 'NONE';

-- CreateIndex
CREATE INDEX "Ticket_isPoison_idx" ON "Ticket"("isPoison");

-- CreateIndex
CREATE INDEX "Ticket_poisonEffect_idx" ON "Ticket"("poisonEffect");
