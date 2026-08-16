/*
  Warnings:

  - You are about to drop the column `energy` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `maxEnergy` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "energy",
DROP COLUMN "maxEnergy",
ADD COLUMN     "nextTicketAt" TIMESTAMP(3),
ADD COLUMN     "queuePenaltyUntil" TIMESTAMP(3);
