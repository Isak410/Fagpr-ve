import { PrismaClient } from "../generated/prisma/client";




const globalForPrisma = global as unknown as { prisma: PrismaClient };
 
export const prisma =
  globalForPrisma.prisma