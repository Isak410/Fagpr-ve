'use client';
import { House } from 'lucide-react';
import LinkButton from './buttons/linkButton';
import { Car } from 'lucide-react';

export default function SidebarMenu({
    expanded,
    isSignedIn,
}: {
    expanded: boolean;
    isSignedIn: boolean;
}) {
    return (
        <div className="flex flex-col gap-4 w-full px-3.5">
            <>
                <LinkButton
                    text="Home"
                    Icon={House}
                    href="/home"
                    expanded={expanded}
                />
                {isSignedIn && (
                    <LinkButton
                        text="Cars"
                        Icon={Car}
                        href="/cars"
                        expanded={expanded}
                        relatedRoutes={['cars', 'add', 'book']}
                    />
                )}
            </>
        </div>
    );
}
