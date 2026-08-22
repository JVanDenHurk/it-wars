-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "careerCorrectBounces" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "careerIncorrectBounces" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "careerIncorrectResolves" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "careerTicketsResolved" INTEGER NOT NULL DEFAULT 0;
