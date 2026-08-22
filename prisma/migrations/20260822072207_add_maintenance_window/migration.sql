-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "maintenancePausedMinutes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maintenanceUntil" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Ticket_maintenanceUntil_idx" ON "Ticket"("maintenanceUntil");
