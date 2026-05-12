import prisma from '@/app/lib/prisma';
import Link from 'next/link';

export default async function HomePage() {
    const totalCars = await prisma.car.count();

    const totalBookings = await prisma.booking.count();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <div className="max-w-5xl w-full">
                <div className="bg-white rounded-3xl shadow-xl p-10">
                    <div className="mb-12 text-center">
                        <h1 className="text-5xl font-bold mb-4">
                            Vehicle Rental System
                        </h1>

                        <p className="text-gray-600 text-lg">
                            Browse vehicles and book directly online through a
                            simple and modern booking platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-gray-100 rounded-2xl p-8 text-center">
                            <p className="text-gray-500 text-sm uppercase tracking-wide">
                                Available Vehicles
                            </p>

                            <h2 className="text-5xl font-bold mt-3">
                                {totalCars}
                            </h2>
                        </div>

                        <div className="bg-gray-100 rounded-2xl p-8 text-center">
                            <p className="text-gray-500 text-sm uppercase tracking-wide">
                                Total Bookings
                            </p>

                            <h2 className="text-5xl font-bold mt-3">
                                {totalBookings}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
