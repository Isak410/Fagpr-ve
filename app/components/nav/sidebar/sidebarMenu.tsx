'use client';
import { House } from 'lucide-react';
import { BookUser } from 'lucide-react';
import { AudioLines } from 'lucide-react';
import { Wallpaper } from 'lucide-react';
import { Factory } from 'lucide-react';
import { Upload } from 'lucide-react';
import { Rows3 } from 'lucide-react';
import LinkButton from './buttons/linkButton';
import { Car } from 'lucide-react';

export default function SidebarMenu({ expanded }: { expanded: boolean }) {
    return (
        <div className="flex flex-col gap-4 w-full px-3.5">
            <>
                <LinkButton
                    text="Home"
                    Icon={House}
                    href="/home"
                    expanded={expanded}
                />
                <LinkButton
                    text="Cars"
                    Icon={Car}
                    href="/cars"
                    expanded={expanded}
                />
            </>
        </div>
    );
}
