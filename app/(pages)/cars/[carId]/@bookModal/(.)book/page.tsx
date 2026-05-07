import prisma from '@/app/lib/prisma';
import BookModal from './bookModal';

export default async function Page({
    params,
}: {
    params: Promise<{ carId: string }>;
}) {
    const { carId } = await params;

    const car = await prisma.car.findUnique({
        where: {
            id: parseInt(carId),
        },

        include: {
            bookings: true,
        },
    });

    if (!car) return null;

    return <BookModal carId={car.id} bookings={car.bookings} />;
}
