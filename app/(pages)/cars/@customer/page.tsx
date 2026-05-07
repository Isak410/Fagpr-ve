import prisma from '@/app/lib/prisma';
import Link from 'next/link';

export default async function DashboardCustomer() {
    const cars = await prisma.car.findMany({
        include: {
            images: true,
        },
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">Cars</h1>
                </div>

                {/* Car list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map((car) => {
                        const imageUrl = car.images[0]
                            ? car.images[0].url
                            : 'https://via.placeholder.com/300';

                        return (
                            <Link key={car.id} href={`/cars/${car.id}`}>
                                <div className="bg-white rounded-xl shadow p-4 hover:scale-101 hover:bg-slate-100 transition-all duration-200">
                                    <img
                                        src={imageUrl}
                                        alt={`${car.brand} ${car.modelName}`}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />

                                    <h2 className="font-semibold text-lg">
                                        {car.brand} {car.modelName}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {car.plateNo}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
