'use client';

import { useRouter } from 'next/navigation';
import DeleteBookingButton from './DeleteBookingButton';
import { bookingType } from './types/bookingType';
import { useEffect, useState } from 'react';

export default function ViewBookingPage({
    bookings,
}: {
    bookings: bookingType;
}) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);
    return (
        <div
            onClick={() => router.back()}
            className="z-40 fixed inset-0 flex items-center justify-center bg-gray-300/50 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl p-6 shadow-xl w-full max-w-3xl transform transition-transform duration-300 ${
                    isVisible ? 'scale-100' : 'scale-75'
                }`}
            >
                <div className="flex flex-col gap-4">
                    {bookings.length < 1 ? (
                        <p className="text-xl">No bookings for this vehicle</p>
                    ) : (
                        <div className="max-h-160 overflow-auto">
                            <p className="text-lg font-bold mb-4">
                                {`Bookings for ${bookings[0].car.brand} ${bookings[0].car.modelName} (${bookings[0].car.plateNo})`}
                            </p>

                            {bookings.map((booking) => {
                                const startDate = new Date(
                                    booking.startDate
                                ).toLocaleDateString();

                                const endDate = new Date(
                                    booking.endDate
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
        </div>
    );
}
