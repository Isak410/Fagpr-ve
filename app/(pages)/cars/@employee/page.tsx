import prisma from '@/app/lib/prisma';

export default async function DashboardEmployee() {
    const cars = await prisma.car.findMany();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">Cars</h1>

                    <a
                        href="/cars/add-car"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                        + Add Car
                    </a>
                </div>

                {/* Car list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map((car) => {
                        const imageUrl =
                            car.imageUrl || 'https://via.placeholder.com/300';

                        return (
                            <div
                                key={car.id}
                                className="bg-white rounded-xl shadow p-4"
                            >
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
