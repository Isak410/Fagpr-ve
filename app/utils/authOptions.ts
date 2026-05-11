import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) throw new Error('Credentials are missing');

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) throw new Error('User not found');
                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password,
                );
                if (!isValid) throw new Error('Incorrect password');

                return {
                    ...user,
                    id: user.id.toString(),
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt' as 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // @ts-expect-error later
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                };
            }
            return session;
        },
        // @ts-expect-error later
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
};
