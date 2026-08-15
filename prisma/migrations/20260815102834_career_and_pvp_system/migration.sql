/*
  Warnings:

  - You are about to drop the column `accuracy` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `attack` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `defence` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `hp` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `maxHp` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `stress` on the `Player` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CareerPath" AS ENUM ('NETWORK', 'SYSTEMS', 'SECURITY');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TicketStatus" ADD VALUE 'FAILED';
ALTER TYPE "TicketStatus" ADD VALUE 'EXPIRED';

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "accuracy",
DROP COLUMN "attack",
DROP COLUMN "class",
DROP COLUMN "defence",
DROP COLUMN "hp",
DROP COLUMN "maxHp",
DROP COLUMN "stress",
ADD COLUMN     "bankruptcies" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "careerPath" "CareerPath",
ADD COLUMN     "correctBounces" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "incorrectBounces" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "incorrectResolves" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "kills" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lifetimeCreditsEarned" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lifetimeTicketsHandled" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ticketsResolved" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "credits" SET DEFAULT 1000;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "baseXp" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "bounceCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "expiredAt" TIMESTAMP(3),
ADD COLUMN     "lastSentById" INTEGER;

-- AlterTable
ALTER TABLE "TicketTemplate" ADD COLUMN     "difficulty" INTEGER NOT NULL DEFAULT 1;

-- DropEnum
DROP TYPE "PlayerClass";

-- CreateIndex
CREATE INDEX "Ticket_lastSentById_idx" ON "Ticket"("lastSentById");

-- CreateIndex
CREATE INDEX "TicketTemplate_category_idx" ON "TicketTemplate"("category");

-- CreateIndex
CREATE INDEX "TicketTemplate_active_idx" ON "TicketTemplate"("active");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_lastSentById_fkey" FOREIGN KEY ("lastSentById") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
