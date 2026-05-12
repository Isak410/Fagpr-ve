import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function CustomerHome() {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    const bookings = await prisma.booking.findMany({
        where: {
            userId: parseInt(session.user.id),
        },

        include: {
            car: {
                include: {
                    images: true,
                },
            },
        },

        orderBy: {
            startDate: 'asc',
        },
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Customer Dashboard
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your bookings and browse available vehicles
                        </p>
                    </div>

                    <Link
                        href="/cars"
                        className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white px-5 py-3 rounded-xl"
                    >
                        Browse Vehicles
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">
                        Your Bookings
                    </h2>

                    {bookings.length === 0 ? (
                        <div className="bg-gray-100 rounded-xl p-6 text-center">
                            <p className="text-gray-600">
                                You currently have no bookings
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {bookings.map((booking) => {
                                const image =
                                    booking.car.images[0]?.url ||
                                    'https://via.placeholder.com/300';

                                return (
                                    <div
                                        key={booking.id}
                                        className="bg-gray-100 rounded-xl p-4 flex gap-4"
                                    >
                                        <img
                                            src={image}
                                            alt=""
                                            className="w-32 h-24 object-cover rounded-lg"
                                        />

                                        <div className="flex flex-col justify-center">
                                            <h3 className="font-semibold text-lg">
                                                {booking.car.brand}{' '}
                                                {booking.car.modelName}
                                            </h3>

                                            <p className="text-sm text-gray-600">
                                                {new Date(
                                                    booking.startDate,
                                                ).toLocaleDateString()}
                                                {' → '}
                                                {new Date(
                                                    booking.endDate,
                                                ).toLocaleDateString()}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Pickup time:{' '}
                                                {booking.pickupTime}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
