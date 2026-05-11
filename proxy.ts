import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const pathname = req.nextUrl.pathname;

    // Protected routes
    const protectedRoutes = ['/cars'];

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route),
    );

    // No session -> redirect
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    return NextResponse.next();
}
