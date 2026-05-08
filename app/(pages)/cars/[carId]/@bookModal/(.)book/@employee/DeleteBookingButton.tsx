'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteBookingButton({
    bookingId,
}: {
    bookingId: number;
}) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            const response = await fetch(`/api/booking/delete/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }

            router.refresh();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="mt-4 bg-red-400 hover:bg-red-500 transition-colors duration-200 text-lg text-white px-4 py-2 rounded-lg"
        >
            {loading ? 'Deleting...' : 'Delete'}
        </button>
    );
}
