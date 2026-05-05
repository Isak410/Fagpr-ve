'use client';
import { signIn, useSession } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();
    console.log(session);
    return (
        <div>
            {/* <p>Fagprøve</p>
            <button
                className="bg-blue-500 text-white text-2xl rounded p-1 border-2 border-gray-200"
                onClick={() => {
                    signIn();
                }}
            >
                Sign in
            </button> */}
        </div>
    );
}
