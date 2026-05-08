import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CarImageGallery from '../components/CarImages';
import prisma from '@/app/lib/prisma';

export default async function Page({
    params,
}: {
    params: Promise<{ carId: string }>;
}) {
    const { carId } = await params;

    const carData = await prisma.car.findUnique({
        where: {
            id: parseInt(carId),
        },
        include: {
            bookings: true,
            images: true,
        },
    });

    if (!carData) {
        return <div className="p-10 text-center">Car not found</div>;
    }
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <Link
                    className="absolute ml-4 mt-4 bg-white p-1 rounded  hover:bg-blue-100 transition-all duration-200"
                    href={'/cars'}
                >
                    <ArrowLeft />
                </Link>
                {/* Image gallery */}
                <CarImageGallery images={carData.images} />

                {/* Content */}
                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {carData.brand} {carData.modelName}
                            </h1>

                            <p className="text-gray-500 mt-1">
                                {carData.plateNo}
                            </p>
                        </div>

                        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                            Available
                        </div>
                    </div>

                    {/* Description-ish section */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold mb-3">
                            Information
                        </h2>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-100 p-4 rounded-xl">
                                <p className="text-gray-500">Brand</p>
                                <p className="font-medium">{carData.brand}</p>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-xl">
                                <p className="text-gray-500">Model</p>
                                <p className="font-medium">
                                    {carData.modelName}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 w-full flex flex-row justify-between">
                        <Link
                            href={`/cars/${carId}/book`}
                            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white px-4 py-2 rounded-lg shadow"
                        >
                            View bookings
                        </Link>
                        <Link
                            href={`/cars/${carId}`}
                            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white px-4 py-2 rounded-lg shadow"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
