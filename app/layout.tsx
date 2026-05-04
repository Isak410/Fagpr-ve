import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from './providers/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './utils/authOptions';

export const metadata: Metadata = {
    title: 'Fagprøve',
    description: 'Fagprøve Isak Stene-Pettersen',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`h-full antialiased`}>
            <NextAuthProvider>
                <body className="min-h-full flex flex-col">{children}</body>
            </NextAuthProvider>
        </html>
    );
}
