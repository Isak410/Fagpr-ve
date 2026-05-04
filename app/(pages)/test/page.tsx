import prisma from '@/app/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';

export default async function Test() {
    // const res = await prisma.user.findMany();
    // console.log(res);
    const session = await getServerSession();
    console.log(session);
    return (
        <div>
            <p>Test side</p>
        </div>
    );
}
