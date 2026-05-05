'use client';

import { redirect } from 'next/navigation';

export default function Logo({ expanded }: { expanded: boolean }) {
    return (
        <h1
            onClick={() => redirect('/home')}
            className={`
        cursor-pointer font-extrabold transition-all duration-300 tracking-wide
        ${expanded ? 'text-2xl' : 'text-3xl'}
      `}
        >
            {expanded ? 'NordBil' : 'NB'}
        </h1>
    );
}
