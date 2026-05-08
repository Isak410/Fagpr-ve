'use client';
import { useState, useEffect } from 'react';
import { encryptString } from './utils/encryptString';
import axios from 'axios';
import { ModalTypes } from './types/ModalTypes';
// import { addToast } from '@heroui/toast';
// import { getToastClassNames } from '@/app/utils/getToastClassNames';

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

    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Trigger the animation when the modal is rendered
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const hashedPassword = await encryptString(formData.password);
            const payload = {
                name: formData.name,
                email: formData.email,
                password: hashedPassword,
            };

            const response = await axios.post('/api/users/createUser', {
                params: payload,
            });
            if (response.data.success) {
                // addToast({
                //     title: 'Success',
                //     description: 'Successfully created user, redirecting...',
                //     classNames: getToastClassNames('green-500'),
                // });
                setTimeout(() => toggleSignUpActive(), 1000);
                // TODO legg til toast shit
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Something went wrong');
            } else {
                setError('Something went wrong');
            }
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
                {error && (
                    <p className="w-full text-center text-red-600 text-sm mb-4">
                        {error}
                    </p>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full"
                >
                    <input
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="text"
                        name="name"
                        placeholder="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
                    >
                        Create Account
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
