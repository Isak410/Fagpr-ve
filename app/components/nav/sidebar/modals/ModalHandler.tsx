'use client';

import { useEffect, useState } from 'react';
import { SignInModal } from './SignInModal';
import SignUpModal from './SignUpModal';
import { redirect, usePathname } from 'next/navigation';
import { getWrapperClasses } from './utils/wrapperClasses';
import { CircleUserRound, EllipsisVertical, LogIn } from 'lucide-react';

export default function ModalHandler({
    expanded,
    username,
    isSignedIn,
}: {
    expanded: boolean;
    username: string;
    isSignedIn: boolean;
}) {
    const pathName = usePathname();

    const [signInModalActive, setSignInModalActive] = useState(false);
    const [signUpActive, setSignUpActive] = useState(false);

    const toggleSignUpActive = () => setSignUpActive(!signUpActive);
    const toggleModals = () => setSignInModalActive(!signInModalActive);

    return (
        <>
            {/* USER LOGGED IN */}
            {isSignedIn ? (
                <>
                    {expanded ? (
                        <div
                            onClick={() => redirect('/settings')}
                            className={getWrapperClasses(true, pathName)}
                        >
                            <p
                                className={`text-white font-bold text-lg transition-opacity duration-200 w-fit truncate overflow-hidden'}`}
                            >
                                {username}
                            </p>
                            <EllipsisVertical />
                        </div>
                    ) : (
                        <div
                            onClick={() => redirect('/settings')}
                            className={getWrapperClasses(false, pathName)}
                        >
                            {/* Username */}
                            <EllipsisVertical />
                        </div>
                    )}
                </>
            ) : (
                /* USER LOGGED OUT */
                <>
                    {expanded ? (
                        <div
                            className={getWrapperClasses(true, pathName)}
                            onClick={() => setSignInModalActive(true)}
                        >
                            {/* Sign In label */}
                            <p
                                className={`text-white font-bold text-lg transition-opacity duration-200 w-fit truncate overflow-hidden'}`}
                            >
                                Sign in
                            </p>

                            {/* Icon */}
                            <LogIn />
                        </div>
                    ) : (
                        <div
                            className={getWrapperClasses(false, pathName)}
                            onClick={() => setSignInModalActive(true)}
                        >
                            <LogIn />
                        </div>
                    )}
                </>
            )}

            {/* MODALS */}
            {signInModalActive && (
                <>
                    {signUpActive ? (
                        <SignUpModal
                            toggleModals={toggleModals}
                            toggleSignUpActive={toggleSignUpActive}
                        />
                    ) : (
                        <SignInModal
                            toggleModals={toggleModals}
                            toggleSignUpActive={toggleSignUpActive}
                        />
                    )}
                </>
            )}
        </>
    );
}
