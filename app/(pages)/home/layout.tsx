import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';

export default async function HomeLayout({
    customer,
    employee,
}: {
    customer: React.ReactNode;
    employee: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    let user;
    if (session?.user?.id) {
        user = await prisma.user.findUnique({
            where: {
                id: parseInt(session.user.id),
            },
        });
    }
    return (
        <div>
            {session && session.user && user ? (
                <>{user.role == 'EMPLOYEE' ? employee : customer}</>
            ) : (
                <>Hero Page</>
            )}
        </div>
    );
}
