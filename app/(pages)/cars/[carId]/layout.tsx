import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import CarImageGallery from './components/CarImages';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function Layout({
    employee,
    customer,
    params,
    bookModal,
}: {
    children: React.ReactNode;
    employee: React.ReactNode;
    customer: React.ReactNode;
    bookModal: React.ReactNode;
    params: Promise<{ carId: string }>;
}) {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(session.user.id),
        },
    });
    const { carId } = await params;

    return (
        <>
            {bookModal}
            <>{user?.role === 'EMPLOYEE' ? employee : customer}</>
        </>
    );
}
