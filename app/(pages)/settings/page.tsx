'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    return (
        <div className="flex items-center align-middle justify-center">
            <button
                onClick={() => {
                    signOut();
                    router.replace('/home');
                }}
                className="absolute text-white font-bold bottom-8 right-2 bg-red-600 hover:bg-red-700 transition-all duration-200 flex items-center flex-row text-lg rounded-lg p-3 border border-black w-fit"
            >
                Sign Out{' '}
                <LogOut
                    strokeWidth={3.5}
                    className="ml-2"
                    size={20}
                    height={'fit'}
                />
            </button>
        </div>
    );
}
