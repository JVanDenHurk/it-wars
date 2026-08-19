-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "difficulty" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Ticket_difficulty_idx" ON "Ticket"("difficulty");

-- CreateIndex
CREATE INDEX "TicketTemplate_difficulty_idx" ON "TicketTemplate"("difficulty");
