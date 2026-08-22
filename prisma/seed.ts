import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import ticketTemplates from "../src/data/ticket-templates.json";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log(
    `Importing ${ticketTemplates.length} ticket templates...`
  );

  /*
   * Remove existing ticket templates.
   *
   * This does NOT remove live tickets.
   */
  await prisma.ticketTemplate.deleteMany();

  /*
   * Import ticket templates from JSON.
   */
  await prisma.ticketTemplate.createMany({
    data: ticketTemplates.map((template) => ({
      title: template.title,

      description: template.description,

      category: template.category as
        | "SERVICE_DESK"
        | "NETWORK"
        | "SYSTEMS"
        | "SECURITY",

      severity: template.severity as
        | "P1"
        | "P2"
        | "P3"
        | "P4",

      difficulty: template.difficulty,

      maxValue: template.maxValue,

      baseXp: template.baseXp,

      /*
       * Ticket-specific outcome messages.
       */
      successMessage: template.successMessage,

      failureMessage: template.failureMessage,

      active: template.active ?? true,
    })),
  });

  console.log(
    `Imported ${ticketTemplates.length} ticket templates successfully.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(
      "Ticket template seed failed:",
      error
    );

    await prisma.$disconnect();

    process.exit(1);
  });