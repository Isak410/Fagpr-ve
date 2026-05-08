import prisma from '@/app/lib/prisma';
import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const brand = formData.get('brand') as string;
        const modelName = formData.get('modelName') as string;

        const plateNo = formData.get('plateNo') as string;

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
        await prisma.car.create({
            data: {
                brand,
                modelName,
                plateNo,

                images: {
                    create: uploadedImages,
                },
            },
        });

        return NextResponse.json({
            success: true,
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
            }
        );
    }
}
