-- Balance pass: lower starting Credits and remove temporary current-run stats.
ALTER TABLE "Player"
ALTER COLUMN "credits" SET DEFAULT 750,
DROP COLUMN "careerTicketsResolved",
DROP COLUMN "careerCorrectBounces",
DROP COLUMN "careerIncorrectBounces",
DROP COLUMN "careerIncorrectResolves";
