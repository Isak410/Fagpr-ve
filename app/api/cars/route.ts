import prisma from '@/app/lib/prisma';
import fs from 'fs/promises';
import path from 'path';
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

        // Upload directory
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure folder exists
        await fs.mkdir(uploadDir, { recursive: true });

        // Save files
        for (const image of images) {
            if (!image || image.size === 0) continue;

            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate unique filename
            const uniqueFileName = `${randomUUID()}-${image.name}`;

            const filePath = path.join(uploadDir, uniqueFileName);

            // Save file
            await fs.writeFile(filePath, buffer);

            uploadedImages.push({
                url: `/uploads/${uniqueFileName}`,
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
            { status: 500 }
        );
    }
}
