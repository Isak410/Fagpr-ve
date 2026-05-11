import DeleteBookingButton from './DeleteBookingButton';
import { bookingType } from './types/bookingType';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ViewBookingPage({
    bookings,
    carId,
}: {
    bookings: bookingType;
    carId: number;
}) {
    return (
        <div
            className={`bg-white rounded-2xl p-6 max-h-8/10 shadow-xl w-full max-w-4xl transform transition-transform duration-300
                }`}
        >
            <div className="flex flex-col gap-4">
                {bookings.length < 1 ? (
                    <div className="flex flex-row">
                        <Link
                            className="aspect-square mr-2 h-fit bg-white p-1 rounded  hover:bg-blue-100 transition-all duration-200"
                            href={`/cars/${carId}`}
                        >
                            <ArrowLeft />
                        </Link>
                        <p className="text-xl">No bookings for this vehicle</p>
                    </div>
                ) : (
                    <div className="max-h-160 overflow-auto">
                        <div className="flex flex-row">
                            <Link
                                className="aspect-square mr-2 h-fit bg-white p-1 rounded  hover:bg-blue-100 transition-all duration-200"
                                href={`/cars/${carId}`}
                            >
                                <ArrowLeft />
                            </Link>
                            <p className="text-lg font-bold mb-4">
                                {`Bookings for ${bookings[0].car.brand} ${bookings[0].car.modelName} (${bookings[0].car.plateNo})`}
                            </p>
                        </div>

                        {bookings.map((booking) => {
                            const startDate = new Date(
                                booking.startDate,
                            ).toLocaleDateString();

                            const endDate = new Date(
                                booking.endDate,
                            ).toLocaleDateString();

                            return (
                                <div
                                    key={booking.id}
                                    className="bg-gray-100 rounded-xl p-4 mb-3 shadow-sm"
                                >
                                    {/* Top row */}
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="font-semibold text-base">
                                            {startDate} → {endDate}
                                        </div>

                                        <DeleteBookingButton
                                            bookingId={booking.id}
                                        />
                                    </div>

                                    {/* Customer */}
                                    <div className=" text-sm text-gray-600">
                                        {booking.customerName}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
