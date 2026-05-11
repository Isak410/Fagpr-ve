import prisma from '@/app/lib/prisma';
import ViewBookingPage from './ViewBookingsPage';

export default async function Page({
    params,
}: {
    params: Promise<{ carId: string }>;
}) {
    const { carId } = await params;
    const bookings = await prisma.booking.findMany({
        include: {
            car: true,
        },
        where: {
            carId: parseInt(carId),
        },
        orderBy: {
            startDate: 'asc',
        },
    });

    return <ViewBookingPage bookings={bookings} />;
}
