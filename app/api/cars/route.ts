import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const carSchema = z.object({
    brand: z.string().min(2, 'Brand must be at least 2 characters'),

    modelName: z.string().min(2, 'Model name must be at least 2 characters'),

    plateNo: z.string().min(7, 'Plate number must be at least 7 characters'),
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthorized',
                },
                {
                    status: 401,
                },
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(session.user.id),
            },
        });

        if (!user || user.role !== 'EMPLOYEE') {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthorized',
                },
                {
                    status: 401,
                },
            );
        }

        const formData = await req.formData();

        const brand = formData.get('brand') as string;

        const modelName = formData.get('modelName') as string;

        const plateNo = formData.get('plateNo') as string;

        // Zod validation
        const validation = carSchema.safeParse({
            brand,
            modelName,
            plateNo,
        });

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: validation.error.issues[0].message,
                },
                {
                    status: 400,
                },
            );
        }

        const images = formData.getAll('images') as File[];

        const uploadedImages: {
            url: string;
            fileName: string;
        }[] = [];

        // Upload images to Vercel Blob
        for (const image of images) {
            if (!image || image.size === 0) continue;

            const uniqueFileName = `${randomUUID()}-${image.name}`;

            const blob = await put(uniqueFileName, image, {
                access: 'public',
            });

            uploadedImages.push({
                url: blob.url,
                fileName: image.name,
            });
        }

        // Create car + images
        const newCar = await prisma.car.create({
            data: {
                brand: validation.data.brand,

                modelName: validation.data.modelName,

                plateNo: validation.data.plateNo,

                images: {
                    create: uploadedImages,
                },
            },
        });

        return NextResponse.json({
            success: true,
            carId: newCar.id,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create car',
            },
            {
                status: 500,
            },
        );
    }
}
