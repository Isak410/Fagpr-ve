
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

const connectionString = process.env.DATABASE_URL;

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: new PrismaPg(new Pool({ connectionString })),
        log: ['query'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
export default prisma;
