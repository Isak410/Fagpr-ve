import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from './providers/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './utils/authOptions';
import SidebarPage from './components/nav/sidebar/sidebar';

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
                <body className="min-h-full flex flex-row">
                    <div className="h-screen grow-0 shrink-0">
                        {/* Parallel sidebar route slot */}
                        <SidebarPage />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                        {children}
                    </div>
                    <p className="fixed bottom-0 right-0 p-2 text-gray-500 text-lg font-sans opacity-50 select-none pointer-events-none">
                        @Isak Stene-Pettersen 2026
                    </p>
                </body>
            </NextAuthProvider>
        </html>
    );
}
