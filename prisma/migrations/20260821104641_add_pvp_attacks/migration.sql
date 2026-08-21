-- CreateEnum
CREATE TYPE "PvPAttackType" AS ENUM ('PASSWORD_RESET_FLOOD', 'NETWORK_OUTAGE', 'FAILED_DEPLOYMENT', 'PHISHING_CAMPAIGN', 'TICKET_STORM', 'MAJOR_INCIDENT');

-- CreateEnum
CREATE TYPE "PvPAttackStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "attackSourcePlayerId" INTEGER,
ADD COLUMN     "pvpAttackId" INTEGER;

-- CreateTable
CREATE TABLE "PvPAttack" (
    "id" SERIAL NOT NULL,
    "type" "PvPAttackType" NOT NULL,
    "status" "PvPAttackStatus" NOT NULL DEFAULT 'ACTIVE',
    "cost" INTEGER NOT NULL,
    "attackerId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "causedBankruptcy" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PvPAttack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PvPAttack_attackerId_idx" ON "PvPAttack"("attackerId");

-- CreateIndex
CREATE INDEX "PvPAttack_targetId_idx" ON "PvPAttack"("targetId");

-- CreateIndex
CREATE INDEX "PvPAttack_type_idx" ON "PvPAttack"("type");

-- CreateIndex
CREATE INDEX "PvPAttack_status_idx" ON "PvPAttack"("status");

-- CreateIndex
CREATE INDEX "PvPAttack_causedBankruptcy_idx" ON "PvPAttack"("causedBankruptcy");

-- CreateIndex
CREATE INDEX "Ticket_attackSourcePlayerId_idx" ON "Ticket"("attackSourcePlayerId");

-- CreateIndex
CREATE INDEX "Ticket_pvpAttackId_idx" ON "Ticket"("pvpAttackId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_attackSourcePlayerId_fkey" FOREIGN KEY ("attackSourcePlayerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_pvpAttackId_fkey" FOREIGN KEY ("pvpAttackId") REFERENCES "PvPAttack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PvPAttack" ADD CONSTRAINT "PvPAttack_attackerId_fkey" FOREIGN KEY ("attackerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PvPAttack" ADD CONSTRAINT "PvPAttack_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
