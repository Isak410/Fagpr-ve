import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
    name: z.string().min(3, 'Username must be at least 3 characters'),

    email: z.email('Invalid email'),

    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const data = body.params;

        const validation = userSchema.safeParse(data);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: validation.error.issues[0].message,
                },
                {
                    status: 400,
                }
            );
        }

        const { name, email, password } = validation.data;

        // Check if email exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'A user with this email already exists',
                },
                {
                    status: 409,
                }
            );
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name,
                role: 'CUSTOMER',
            },
        });

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error',
            },
            {
                status: 500,
            }
        );
    }
}
