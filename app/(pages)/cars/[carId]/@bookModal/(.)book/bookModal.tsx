'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Booking = {
    id: number;
    startDate: Date;
    endDate: Date;
};

export default function BookModal({
    bookings,
    carId,
}: {
    bookings: Booking[];
    carId: number;
}) {
    const [isVisible, setIsVisible] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await fetch('/api/bookings/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    carId,
                    startDate,
                    endDate,
                    pickupTime,
                }),
            });

            router.refresh();
            router.back();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={() => router.back()}
            className="z-40 fixed inset-0 flex items-center justify-center bg-gray-300/50 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl p-6 shadow-xl w-full max-w-lg transform transition-transform duration-300 ${
                    isVisible ? 'scale-100' : 'scale-75'
                }`}
            >
                <h1 className="text-2xl font-semibold mb-6">Book Vehicle</h1>

                {/* Existing bookings */}
                <div className="mb-6">
                    <h2 className="font-medium mb-3">Existing bookings</h2>

                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                        {bookings.length === 0 && (
                            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm">
                                No active bookings
                            </div>
                        )}

                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm"
                            >
                                {new Date(
                                    booking.startDate,
                                ).toLocaleDateString()}
                                {' - '}
                                {new Date(booking.endDate).toLocaleDateString()}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            From date
                        </label>

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            To date
                        </label>

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Pickup time
                        </label>

                        <input
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            placeholder="HH:MM"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={() => router.back()}
                        className="w-full border border-gray-300 p-3 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white p-3 rounded-lg"
                    >
                        {loading ? 'Sending request...' : 'Send Request'}
                    </button>
                </div>
            </div>
        </div>
    );
}
