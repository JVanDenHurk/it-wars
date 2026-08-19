-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "failureMessage" TEXT,
ADD COLUMN     "successMessage" TEXT;

-- AlterTable
ALTER TABLE "TicketTemplate" ADD COLUMN     "failureMessage" TEXT,
ADD COLUMN     "successMessage" TEXT;
