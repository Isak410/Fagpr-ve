import prisma from '@/app/lib/prisma';
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
