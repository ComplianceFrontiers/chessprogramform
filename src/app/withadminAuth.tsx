/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withadminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      const validUsername = 'Admin';
      const validPassword = 'Admin';

      if (username === validUsername && password === validPassword) {
        setIsAuthorized(true); // Grant access if username and password match
      } else {
        router.replace('/adminsignin'); // Redirect if authentication fails
      }
    }, []);

    if (!isAuthorized) {
      return <div>Loading...</div>; // Optional: Add a loading state while checking auth
    }

    return <WrappedComponent {...props} />;
  };
};

export default withadminAuth;
