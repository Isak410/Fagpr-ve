import prisma from '@/app/lib/prisma';

export default async function Test() {
    const res = await prisma.user.findMany();

    return (
        <div>
            <p>Test side</p>
        </div>
    );
}
