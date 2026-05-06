import prisma from '@/app/lib/prisma';

export default async function DashboardCustomer() {
    const cars = await prisma.car.findMany();

    return (
        <div className="dashboard">
            <h1>Customer Dashboard</h1>
            <div className="car-list">
                {cars.map((car, i) => {
                    const imageUrl =
                        car.imageUrl || 'https://via.placeholder.com/150';
                    return (
                        <div key={i} className="car-item">
                            <img
                                src={imageUrl}
                                alt={`${car.brand} ${car.modelName}`}
                            />
                            <p>
                                {car.brand} {car.modelName}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
