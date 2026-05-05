'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { ModalTypes } from './types/ModalTypes';
import { useRouter } from 'next/navigation';

export function SignInModal({ toggleSignUpActive, toggleModals }: ModalTypes) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isVisible, setIsVisible] = useState(false);

    const [displayError, setDisplayError] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setIsVisible(true); // Trigger the animation when the modal is rendered
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDisplayError(false);
        const result = await signIn('credentials', {
            email: credentials.email,
            password: credentials.password,
            redirect: false, // Prevents automatic redirection
        });
        if (result?.ok) {
            toggleModals();
            router.refresh();
        } else {
            setDisplayError(true);
        }
    };

    return (
        <div
            onClick={() => toggleModals()}
            className="left-0 top-0 right-0 bottom-0 absolute flex items-center justify-center h-screen w-screen bg-gray-300/50"
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`flex flex-col items-center border border-gray-200 bg-white rounded-xl p-6 shadow-xl transform transition-transform duration-300 w-96 max-w-md ${
                    isVisible ? 'scale-100' : 'scale-75'
                }`}
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Sign In
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                email: e.target.value,
                            })
                        }
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            })
                        }
                        className="p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                    {displayError && (
                        <p className="w-full text-center text-red-600 text-sm">
                            Invalid credentials
                        </p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
                    >
                        Sign In
                    </button>
                </form>
                <button
                    onClick={() => {
                        toggleSignUpActive();
                    }}
                    className="text-center text-blue-600 hover:text-blue-800 transition-colors mt-4 text-sm"
                >
                    Don't have an account?
                </button>
            </div>
        </div>
    );
}
