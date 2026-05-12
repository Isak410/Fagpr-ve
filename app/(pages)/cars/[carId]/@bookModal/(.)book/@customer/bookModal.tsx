'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { RangeCalendar } from '@heroui/react';

import type { DateValue } from '@internationalized/date';
import type { RangeValue } from '@react-types/shared';

import { getLocalTimeZone, today } from '@internationalized/date';

type Booking = {
    id: number;
    startDate: Date;
    endDate: Date;
};

export default function BookModal({
    bookings,
    carId,
}: {
    carId: number;
    bookings: Booking[];
}) {
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);

    const [value, setValue] = useState<RangeValue<DateValue> | null>(null);

    const [pickupTime, setPickupTime] = useState('');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    // Disable booked dates
    const isDateUnavailable = (date: DateValue) => {
        const current = date.toDate(getLocalTimeZone());

        current.setHours(0, 0, 0, 0);

        return bookings.some((booking) => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);

            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);

            return current >= start && current <= end;
        });
    };

    const handleSubmit = async () => {
        try {
            setError('');

            // Validation
            if (!value) {
                setError('Please select booking dates');
                return;
            }

            if (!pickupTime) {
                setError('Please select pickup time');
                return;
            }

            setLoading(true);

            const response = await fetch('/api/booking', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    carId,

                    startDate: value.start.toDate(getLocalTimeZone()),

                    endDate: value.end.toDate(getLocalTimeZone()),

                    pickupTime,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Something went wrong');
                return;
            }

            router.refresh();
            router.back();
        } catch (err) {
            console.error(err);

            setError('Something went wrong');
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
                className={`bg-white rounded-2xl p-6 shadow-xl w-full max-w-3xl transform transition-transform duration-300 ${
                    isVisible ? 'scale-100' : 'scale-75'
                }`}
            >
                <h1 className="text-2xl font-semibold mb-6">Book Vehicle</h1>

                <div className="mb-4 w-full flex">
                    <div className="w-1/2">
                        <RangeCalendar
                            aria-label="Booking dates"
                            minValue={today(getLocalTimeZone())}
                            value={value}
                            onChange={(newValue) => {
                                if (
                                    newValue &&
                                    newValue.start.compare(newValue.end) === 0
                                ) {
                                    setError(
                                        'Please select at least 2 different dates',
                                    );
                                    return;
                                }

                                setError('');
                                setValue(newValue);
                            }}
                            isDateUnavailable={isDateUnavailable}
                            firstDayOfWeek="mon"
                            className={'w-full'}
                        >
                            <RangeCalendar.Header>
                                <RangeCalendar.NavButton slot="previous" />

                                <RangeCalendar.Heading />

                                <RangeCalendar.NavButton slot="next" />
                            </RangeCalendar.Header>

                            <RangeCalendar.Grid>
                                <RangeCalendar.GridHeader>
                                    {(day) => (
                                        <RangeCalendar.HeaderCell>
                                            {day}
                                        </RangeCalendar.HeaderCell>
                                    )}
                                </RangeCalendar.GridHeader>

                                <RangeCalendar.GridBody>
                                    {(date) => (
                                        <RangeCalendar.Cell date={date} />
                                    )}
                                </RangeCalendar.GridBody>
                            </RangeCalendar.Grid>
                        </RangeCalendar>
                    </div>

                    <div className="flex w-1/2 flex-col">
                        <div className="mb-6 p-2 w-full bg-gray-100 rounded-xl">
                            <label className="block text-sm font-medium mb-0">
                                Pickup time
                            </label>

                            <input
                                type="time"
                                value={pickupTime}
                                onChange={(e) => setPickupTime(e.target.value)}
                                className="w-full bg-white border rounded-lg p-3"
                            />
                        </div>
                        {value && (
                            <div className="mb-6 p-2 w-full bg-gray-100 rounded-xl text-sm">
                                <p>
                                    <span className="font-medium">From:</span>{' '}
                                    {value.start.toString()}
                                </p>

                                <p>
                                    <span className="font-medium">To:</span>{' '}
                                    {value.end.toString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="mb-4 bg-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}
                <div className="flex gap-3">
                    <button
                        onClick={() => router.back()}
                        className="w-full border hover:text-red-400 transition-colors duration-200 border-gray-300 p-3 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200 text-white p-3 rounded-lg"
                    >
                        {loading ? 'Booking...' : 'Book Vehicle'}
                    </button>
                </div>
            </div>
        </div>
    );
}
