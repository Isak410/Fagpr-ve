import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';

export default async function Layout({
    children,
    employee,
    customer,
}: {
    children: React.ReactNode;
    employee: React.ReactNode;
    customer: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(session?.user.id),
        },
    });

    return (
        <>
            {user?.role === 'EMPLOYEE' ? employee : customer}

            {children}
        </>
    );
}
