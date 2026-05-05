import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import SidebarWrapper from './sidebarWrapper';

export default async function SidebarPage() {
    const session = await getServerSession(authOptions);
    const isSignedIn = session && session.user.email && session.user.id;

    return (
        <SidebarWrapper
            username={
                session && session.user && session.user.email
                    ? session.user.email
                    : ''
            }
            isSignedIn={isSignedIn}
        />
    );
}
