// app/user/verify/page.js

'use client';

import { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../../../lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function VerifyEmail() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    if (user) {
      // Jeżeli użytkownik jest zalogowany, sprawdzamy, czy jego e-mail jest zweryfikowany
      if (!user.emailVerified) {
        // Jeśli e-mail nie jest zweryfikowany, pozostawiamy użytkownika na stronie
        setIsLoading(false);
      } else {
        // Jeżeli e-mail jest zweryfikowany, możemy wylogować użytkownika
        signOut(auth)
          .then(() => {
            console.log('User signed out after email verification.');
            router.push('/user/signin'); // Przekierowujemy do strony logowania
          })
          .catch((error) => {
            console.error('Error signing out:', error);
          });
      }
    } else {
      // Jeżeli użytkownik nie jest zalogowany, przekierowujemy go do strony logowania
      router.push('/user/signin');
    }
  }, [user, router]);

  if (isLoading) {
    // Jeśli strona jest w trakcie ładowania, wyświetlamy loader
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-xl font-bold mb-4">Email not verified</h1>
        {user?.email ? (
          <p className="text-gray-700">
            Verify your email by clicking the link sent to: <strong>{user.email}</strong>
          </p>
        ) : (
          <p className="text-gray-700">No user information available.</p>
        )}
        <p className="text-gray-600 mt-4">
          After verification, you can sign in again to access your account.
        </p>
      </div>
    </div>
  );
}
