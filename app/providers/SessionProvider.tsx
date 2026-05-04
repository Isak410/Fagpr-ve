'use client';

import { SessionProvider } from 'next-auth/react';
import useAutoRefreshSession from './useAutoRefreshSession';

type Props = {
    children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
    useAutoRefreshSession();
    return <SessionProvider>{children}</SessionProvider>;
};
