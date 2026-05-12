'use client';

import { useState } from 'react';

type CarImage = {
    id: number;
    url: string;
    fileName: string;
};

export default function CarImageGallery({ images }: { images: CarImage[] }) {
    const [selectedImage, setSelectedImage] = useState(images[0]?.url);

    return (
        <div className="bg-gray-200">
            <div className="w-full h-125 bg-black flex items-center justify-center">
                <img
                    src={selectedImage}
                    alt="Car image"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex gap-3 p-4 overflow-x-auto bg-white">
                {images.map((image) => (
                    <button
                        key={image.id}
                        onClick={() => setSelectedImage(image.url)}
                        className={`border-2 rounded-lg overflow-hidden transition-all ${
                            selectedImage === image.url
                                ? 'border-blue-500'
                                : 'border-transparent'
                        }`}
                    >
                        <img
                            src={image.url}
                            alt={image.fileName}
                            className="w-24 h-20 object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
