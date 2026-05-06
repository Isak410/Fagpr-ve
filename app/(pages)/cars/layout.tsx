import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';

export default async function Layout({
    children,
    employee,
    customer,
    modal,
}: {
    children: React.ReactNode;
    employee: React.ReactNode;
    customer: React.ReactNode;
    modal: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(session.user.id),
        },
    });
    return (
        <>
            {children}
            {modal}
            {user?.role === 'EMPLOYEE' ? employee : customer}
        </>
    );
}
