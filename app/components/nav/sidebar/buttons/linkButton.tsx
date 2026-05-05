'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LinkButtonProps {
    text: string;
    Icon: React.ElementType;
    href: string;
    expanded: boolean;
    relatedRoutes?: string[];
}

export default function LinkButton({
    text,
    Icon,
    href,
    expanded,
    relatedRoutes,
}: LinkButtonProps) {
    const pathName = usePathname();
    const active =
        (href.includes(pathName) && pathName !== '/') ||
        relatedRoutes?.some((route) => pathName.includes(route));

    return (
        <Link
            href={href}
            className={`
        flex items-center w-full py-3 rounded-lg font-semibold shadow-md
        transition-all duration-200 relative
        ${active ? 'bg-sidebarbuttonbg' : 'bg-sidebarbuttonnotselectedbg hover:bg-sidebarbuttonhoverbg'}
        ${expanded ? 'gap-3 px-4 justify-start' : 'px-0 justify-center w-16 h-12'}
      `}
        >
            {/* Icon */}

            <Icon />

            {/* Label (hide when collapsed) */}
            <span
                className={`
          whitespace-nowrap transition-opacity duration-200
          ${expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}
        `}
            >
                {text}
            </span>
        </Link>
    );
}
