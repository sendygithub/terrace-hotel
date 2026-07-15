import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123", 12);

  // Create Admin user
  await prisma.user.upsert({
    where: {
      email: "admin@gmail.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  // Create Regular user
  await prisma.user.upsert({
    where: {
      email: "user@gmail.com",
    },
    update: {},
    create: {
      name: "User",
      email: "user@gmail.com",
      password: hashedPassword,
      role: "user",
    },
  });

  console.log("Seed users created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
