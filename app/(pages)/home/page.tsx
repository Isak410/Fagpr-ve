import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    return <div>Home</div>;
}
