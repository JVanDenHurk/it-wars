-- CreateEnum
CREATE TYPE "TicketSeverity" AS ENUM ('P1', 'P2', 'P3', 'P4');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "abandonmentPenaltyApplied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "abandonmentPenaltyAt" TIMESTAMP(3),
ADD COLUMN     "severity" "TicketSeverity" NOT NULL DEFAULT 'P4';

-- AlterTable
ALTER TABLE "TicketTemplate" ADD COLUMN     "severity" "TicketSeverity" NOT NULL DEFAULT 'P4';

-- CreateIndex
CREATE INDEX "Ticket_severity_idx" ON "Ticket"("severity");

-- CreateIndex
CREATE INDEX "Ticket_abandonmentPenaltyApplied_idx" ON "Ticket"("abandonmentPenaltyApplied");

-- CreateIndex
CREATE INDEX "TicketTemplate_severity_idx" ON "TicketTemplate"("severity");
