'use client';

import { useState } from 'react';
import SidebarMenu from './sidebarMenu';
import ModalHandler from './modals/ModalHandler';
import Logo from './Logo';

interface SidebarWrapperProps {
    isSignedIn: boolean;
    username: string;
}

export default function SidebarWrapper({
    isSignedIn,
    username,
}: SidebarWrapperProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPinned, setIsPinned] = useState(false);

    return (
        <div
            className="h-full w-20"
            onMouseEnter={() => {
                if (!isPinned) setIsExpanded(true);
            }}
            onMouseLeave={() => {
                if (!isPinned) setIsExpanded(false);
            }}
        >
            <div
                className={`
              fixed left-0 top-0 h-full
              flex flex-col justify-between
              bg-contentcontainer text-white shadow-xl
              transition-all duration-300
              ${isExpanded ? 'w-67.5' : 'w-20'}
              z-40 border-r border-gray-700
            `}
            >
                {/* Top */}
                <div className="mt-8 flex flex-col items-center gap-6">
                    <div className={`${isExpanded ? '' : 'scale-75'}`}>
                        <Logo expanded={isExpanded} />
                    </div>

                    {/* Pin button */}
                    {/* <button
                          onClick={() => setIsPinned(!isPinned)}
                          className={`text-gray-300 hover:text-white transition ${
                              isExpanded
                                  ? 'opacity-100'
                                  : 'opacity-0 pointer-events-none'
                          }`}
                      >
                          <i
                              className={`fa-solid fa-thumbtack hover:text-white transition-all duration-200 ${
                                  isPinned ? 'text-white' : 'text-gray-400'
                              }`}
                          ></i>
                      </button> */}

                    {/* Menu */}
                    {isSignedIn && <SidebarMenu expanded={isExpanded} />}
                </div>

                {/* Bottom */}
                <div className="w-full px-3 pb-4">
                    <ModalHandler
                        username={username}
                        isSignedIn={isSignedIn}
                        expanded={isExpanded}
                    />
                </div>
            </div>
        </div>
    );
}
