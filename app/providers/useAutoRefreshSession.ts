import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

const useAutoRefreshSession = () => {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();

        // if (!session) {
        //   return
        // }

        const currentTime = Math.floor(Date.now() / 1000);
        const sessionExpiry = new Date(session.expires).getTime() / 1000;

        // Calculate how much time is left before the session expires
        const timeLeft = sessionExpiry - currentTime;

        // If the session is about to expire (less than 5 minutes), refresh it
        if (timeLeft < 1 * 90) {
          signIn('',{ redirect: false });
        }
      } catch (error) {
        console.error('Error checking session', error);
      }
    };

    // Run the check initially and then every 60 seconds
    checkSession();
    const interval = setInterval(checkSession, 60 * 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);
};

export default useAutoRefreshSession;
