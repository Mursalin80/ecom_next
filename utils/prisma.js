import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export let prisma_Client = null;

if (process.env.NODE_ENV === "production") {
  prisma_Client = new PrismaClient();
} else {
  if (!global.prismaClient) {
    global.prisma_Client = new PrismaClient();
  }
  prisma_Client = global.prisma_Client;
}

export default prisma;
