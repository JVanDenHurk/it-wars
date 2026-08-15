-- CreateEnum
CREATE TYPE "PlayerClass" AS ENUM ('SERVICE_DESK', 'NETWORK_ENGINEER', 'SYSTEMS_ENGINEER', 'SECURITY_ANALYST');

-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('SERVICE_DESK', 'NETWORK', 'SYSTEMS', 'SECURITY');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'RESOLVED', 'BOUNCED');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "class" "PlayerClass";

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "TicketCategory" NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "maxValue" INTEGER NOT NULL,
    "assignedToId" INTEGER NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Ticket_assignedToId_idx" ON "Ticket"("assignedToId");

-- CreateIndex
CREATE INDEX "Ticket_status_idx" ON "Ticket"("status");

-- CreateIndex
CREATE INDEX "Ticket_category_idx" ON "Ticket"("category");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
