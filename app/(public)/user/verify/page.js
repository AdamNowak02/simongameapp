'use client';

import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { useRouter } from 'next/navigation';

export default function VerifyEmail() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    if (user) {
      signOut(auth)
        .then(() => {
          console.log('User signed out after registration.');
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    } else {
      // Jeśli użytkownik nie istnieje, przekieruj na stronę logowania
      router.push('/user/signin');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-xl font-bold mb-4">Email Not Verified</h1>
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
