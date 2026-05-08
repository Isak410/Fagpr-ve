import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';

export default async function Layout({
    employee,
    customer,
}: {
    employee: React.ReactNode;
    customer: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(session.user.id),
        },
    });
    return <>{user?.role === 'EMPLOYEE' ? employee : customer}</>;
}
