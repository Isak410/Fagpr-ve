'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const carSchema = z.object({
    brand: z.string().min(1, 'Brand is required'),
    modelName: z.string().min(1, 'Model is required'),
    plateNo: z.string().min(1, 'Plate number is required'),
    imageUrl: z
        .string()
        .url('Must be a valid URL')
        .optional()
        .or(z.literal('')),
});

export default function AddCarModal() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const [form, setForm] = useState({
        brand: '',
        modelName: '',
        plateNo: '',
        imageUrl: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const [files, setFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState('');

    useEffect(() => {
        console.log(files);
    }, [files]);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);

        const validFiles: File[] = [];

        for (const file of selectedFiles) {
            if (!allowedTypes.includes(file.type)) {
                setFileError('Only JPG, PNG and WEBP are allowed');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setFileError('Max file size is 5MB');
                return;
            }

            validFiles.push(file);
        }

        setFileError('');

        setFiles((prev) => [...prev, ...validFiles]);

        // IMPORTANT:
        e.target.value = '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        setErrors({});
        setLoading(true);

        const result = carSchema.safeParse(form);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};

            result.error.issues.forEach((err) => {
                const field = err.path[0] as string;
                fieldErrors[field] = err.message;
            });

            setErrors(fieldErrors);
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();

            formData.append('brand', form.brand);
            formData.append('modelName', form.modelName);
            formData.append('plateNo', form.plateNo);

            files.forEach((file) => {
                formData.append('images', file);
            });

            await fetch('/api/cars', {
                method: 'POST',
                body: formData,
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
            className={`bg-white h-fit rounded-xl p-6 shadow-xl w-full max-w-4xl transform transition-transform duration-300
                }`}
        >
            <div className="flex flex-row">
                <Link
                    className="bg-white h-fit mr-2 p-1 rounded  hover:bg-blue-100 transition-all duration-200"
                    href={`/cars`}
                >
                    <ArrowLeft />
                </Link>
                <h1 className="text-xl font-semibold mb-6">Add Car</h1>
            </div>

            {/* Brand */}
            <input
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full mb-2 p-3 border rounded-lg"
            />
            {errors.brand && (
                <p className="text-sm text-red-500 mb-2">{errors.brand}</p>
            )}

            {/* Model */}
            <input
                name="modelName"
                placeholder="Model"
                value={form.modelName}
                onChange={handleChange}
                className="w-full mb-2 p-3 border rounded-lg"
            />
            {errors.modelName && (
                <p className="text-sm text-red-500 mb-2">{errors.modelName}</p>
            )}

            {/* Plate */}
            <input
                name="plateNo"
                placeholder="Plate Number"
                value={form.plateNo}
                onChange={handleChange}
                className="w-full mb-2 p-3 border rounded-lg"
            />
            {errors.plateNo && (
                <p className="text-sm text-red-500 mb-2">{errors.plateNo}</p>
            )}

            {/* Image URL */}
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                    Car Images
                </label>

                <input
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    id="car-images"
                />

                <label
                    htmlFor="car-images"
                    className="cursor-pointer inline-block bg-gray-100 hover:bg-gray-200 transition-all duration-200 px-4 py-2 rounded-lg border"
                >
                    Upload Images
                </label>

                {fileError && (
                    <p className="text-red-500 text-sm mt-2">{fileError}</p>
                )}

                <div className="mt-4 flex flex-col gap-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-gray-100 border rounded-lg px-3 py-2"
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                <span>📎</span>

                                <div className="truncate">
                                    <p className="text-sm font-medium truncate">
                                        {file.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)}{' '}
                                        MB
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setFiles(
                                        files.filter((_, i) => i !== index),
                                    );
                                }}
                                className="text-red-500 hover:text-red-600"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
                <button
                    onClick={() => router.back()}
                    className="w-full border border-gray-300 hover:bg-gray-200/50 transition-all duration-200 p-3 rounded-lg"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-500 transition-all duration-200 hover:bg-blue-600 text-white p-3 rounded-lg"
                >
                    {loading ? 'Adding...' : 'Add Car'}
                </button>
            </div>
        </div>
    );
}
