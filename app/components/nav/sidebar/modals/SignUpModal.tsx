'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';

import { encryptString } from './utils/encryptString';
import { ModalTypes } from './types/ModalTypes';

const signUpSchema = z
    .object({
        name: z
            .string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name is too long'),

        email: z.email('Invalid email address'),

        password: z.string().min(8, 'Password must be at least 8 characters'),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export default function SignUpModal({
    toggleSignUpActive,
    toggleModals,
}: ModalTypes) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [serverError, setServerError] = useState('');

    const [isVisible, setIsVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // Remove field error while typing
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({});
        setServerError('');
        setLoading(true);

        const validation = signUpSchema.safeParse(formData);

        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};

            validation.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;

                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);

            setLoading(false);

            return;
        }

        try {
            const hashedPassword = await encryptString(
                validation.data.password,
            );

            const payload = {
                name: validation.data.name,
                email: validation.data.email,
                password: hashedPassword,
            };

            const response = await axios.post('/api/users/createUser', {
                params: payload,
            });

            if (response.data.success) {
                setTimeout(() => toggleSignUpActive(), 1000);
            } else {
                setServerError(response.data.message);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setServerError(
                    err.response?.data?.message || 'Something went wrong',
                );
            } else {
                setServerError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={() => {
                toggleModals();
                toggleSignUpActive();
            }}
            className="left-0 top-0 right-0 bottom-0 absolute flex items-center justify-center h-screen w-screen bg-gray-300/50"
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`flex flex-col items-center border border-gray-200 bg-white rounded-xl p-6 shadow-xl transform transition-transform duration-300 w-96 max-w-md ${
                    isVisible ? 'scale-100' : 'scale-75'
                }`}
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Sign Up
                </h2>

                {serverError && (
                    <p className="w-full text-center text-red-600 text-sm mb-4">
                        {serverError}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 w-full"
                >
                    <input
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mb-2">
                            {errors.name}
                        </p>
                    )}

                    {/* Email */}
                    <input
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mb-2">
                            {errors.email}
                        </p>
                    )}

                    {/* Password */}
                    <input
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mb-2">
                            {errors.password}
                        </p>
                    )}

                    {/* Confirm Password */}
                    <input
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mb-2">
                            {errors.confirmPassword}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium mt-2 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <button
                    onClick={() => {
                        toggleSignUpActive();
                    }}
                    className="text-center text-blue-600 hover:text-blue-800 transition-colors mt-4 text-sm"
                >
                    Already have an account?
                </button>
            </div>
        </div>
    );
}
