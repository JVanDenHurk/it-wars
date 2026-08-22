-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "slaAgeOffsetMinutes" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Ticket_slaAgeOffsetMinutes_idx" ON "Ticket"("slaAgeOffsetMinutes");
