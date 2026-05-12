import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function DELETE(
    req: Request,
    {
        params,
    }: {
        params: Promise<{ bookingId: string }>;
    },
) {
    try {
        const { bookingId } = await params;
        const session = await getServerSession(authOptions);
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(session.user.id),
            },
        });
        if (!user || !session || user.role !== 'EMPLOYEE') {
            return NextResponse.json(
                {
                    success: false,
                },
                {
                    status: 401,
                },
            );
        }
        await prisma.booking.delete({
            where: {
                id: parseInt(bookingId),
            },
        });

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            },
        );
    }
}
