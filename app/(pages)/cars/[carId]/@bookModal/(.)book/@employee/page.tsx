import prisma from '@/app/lib/prisma';
import ViewBookingPage from './ViewBookingsPage';

export default async function Page() {
    const bookings = await prisma.booking.findMany({
        include: {
            car: true,
        },

        orderBy: {
            startDate: 'asc',
        },
    });

    return <ViewBookingPage bookings={bookings} />;
}
