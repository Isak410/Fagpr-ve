import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function EmployeeHome() {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    const cars = await prisma.car.count();

    const bookings = await prisma.booking.findMany({
        take: 5,
        orderBy: {
            startDate: 'asc',
        },
        include: {
            car: true,
        },
    });

    const customerCount = await prisma.user.count({
        where: {
            role: 'CUSTOMER',
        },
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Employee Dashboard</h1>

                    <p className="text-gray-500 mt-1">
                        Overview of vehicles and bookings
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow">
                        <p className="text-gray-500 text-sm">Cars</p>

                        <h2 className="text-3xl font-bold mt-2">{cars}</h2>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow">
                        <p className="text-gray-500 text-sm">Active Bookings</p>

                        <h2 className="text-3xl font-bold mt-2">
                            {bookings.length}
                        </h2>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow">
                        <p className="text-gray-500 text-sm">Customers</p>

                        <h2 className="text-3xl font-bold mt-2">
                            {customerCount}
                        </h2>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                    <Link
                        href="/cars"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl"
                    >
                        View Cars
                    </Link>

                    <Link
                        href="/cars/add"
                        className="bg-white border hover:bg-gray-50 px-5 py-3 rounded-xl"
                    >
                        Add Car
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Upcoming Bookings
                    </h2>

                    <div className="flex flex-col gap-3">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-gray-100 rounded-lg p-4"
                            >
                                <p className="font-medium">
                                    {booking.car.brand} {booking.car.modelName}
                                </p>

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
                                    {booking.customerName}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
