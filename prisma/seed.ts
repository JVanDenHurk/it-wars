import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.ticketTemplate.createMany({
    data: [
      {
        title: "Account Locked",
        description:
          "User entered the wrong password multiple times and cannot log in.",
        category: "SERVICE_DESK",
        maxValue: 100,
        baseXp: 10,
      },
      {
        title: "Outlook Won't Open",
        description:
          "Outlook crashes immediately after the user launches it.",
        category: "SERVICE_DESK",
        maxValue: 120,
        baseXp: 12,
      },
      {
        title: "Switch Port Errors",
        description:
          "A switch port is reporting excessive CRC errors and packet loss.",
        category: "NETWORK",
        maxValue: 180,
        baseXp: 18,
      },
      {
        title: "VLAN Connectivity Issue",
        description:
          "Devices on VLAN 30 cannot communicate with the default gateway.",
        category: "NETWORK",
        maxValue: 220,
        baseXp: 22,
      },
      {
        title: "Domain Controller Replication",
        description:
          "One domain controller has not replicated successfully for several hours.",
        category: "SYSTEMS",
        maxValue: 250,
        baseXp: 25,
      },
      {
        title: "Suspicious Login",
        description:
          "A user account logged in from an unusual country and location.",
        category: "SECURITY",
        maxValue: 250,
        baseXp: 25,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });