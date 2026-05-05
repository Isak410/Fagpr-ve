'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    return (
        <div className="w-full h-full flex flex-col-reverse p-2">
            <button
                onClick={() => {
                    signOut();
                    router.push('/home');
                }}
                className="bg-red-300 hover:bg-red-400 transition-all duration-200 flex flex-row text-xl rounded p-3 border border-gray-400 w-fit"
            >
                Sign Out <LogOut className="ml-2" size={20} height={'fit'} />
            </button>
        </div>
    );
}
