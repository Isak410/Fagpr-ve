import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const bookingSchema = z.object({
    carId: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    pickupTime: z.string().min(1),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const validation = bookingSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'Invalid input',
                },
                {
                    status: 400,
                },
            );
        }

        const { carId, startDate, endDate, pickupTime } = validation.data;

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Validate dates
        if (start > end) {
            return NextResponse.json(
                {
                    error: 'Start date cannot be after end date',
                },
                {
                    status: 400,
                },
            );
        }

        // Check if car exists
        const car = await prisma.car.findUnique({
            where: {
                id: carId,
            },
        });

        if (!car) {
            return NextResponse.json(
                {
                    error: 'Car not found',
                },
                {
                    status: 404,
                },
            );
        }

        // Overlapping booking check
        const overlappingBooking = await prisma.booking.findFirst({
            where: {
                carId,

                AND: [
                    {
                        startDate: {
                            lte: end,
                        },
                    },

                    {
                        endDate: {
                            gte: start,
                        },
                    },
                ],
            },
        });

        if (overlappingBooking) {
            return NextResponse.json(
                {
                    error: 'Car is already booked during this period',
                },
                {
                    status: 409,
                },
            );
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                carId,
                customerName: 'Temporary Customer',
                startDate: start,
                endDate: end,
                pickupTime,
            },
        });

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: 'Internal server error',
            },
            {
                status: 500,
            },
        );
    }
}
