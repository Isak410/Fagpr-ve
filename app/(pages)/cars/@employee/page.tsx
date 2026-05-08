import { isDateBetweenBooking } from '@/app/lib/isDateBetweenBooking';
import prisma from '@/app/lib/prisma';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
export default async function DashboardEmployee() {
    const cars = await prisma.car.findMany({
        include: {
            images: true,
            bookings: true,
        },
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">Cars</h1>

                    <Link
                        href="/cars/add"
                        className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white px-4 py-2 rounded-lg shadow"
                    >
                        + Add Car
                    </Link>
                </div>

                {/* Car list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map((car) => {
                        const imageUrl = car.images[0]
                            ? car.images[0].url
                            : 'https://via.placeholder.com/300';
                        const bookedToday = car.bookings.some((booking) =>
                            isDateBetweenBooking(
                                booking.startDate,
                                booking.endDate
                            )
                        );
                        return (
                            <Link key={car.id} href={`/cars/${car.id}`}>
                                <div className="bg-white rounded-xl shadow p-4 hover:scale-101 hover:bg-slate-100 transition-all duration-200">
                                    <img
                                        src={imageUrl}
                                        alt={`${car.brand} ${car.modelName}`}
                                        className="w-full h-60 object-cover rounded-lg mb-4"
                                    />

                                    <h2 className="font-semibold text-lg">
                                        {car.brand} {car.modelName}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {car.plateNo}
                                    </p>
                                    <div className="mt-3">
                                        {bookedToday ? (
                                            <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
                                                Booked
                                            </span>
                                        ) : (
                                            <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
                                                Available
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
