'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../../lib/firebase'; // Upewnij się, że ścieżka jest poprawna
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null); // Przechowuje dane zalogowanego użytkownika
  const [loading, setLoading] = useState(true); // Do zarządzania stanem ładowania
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Jeśli użytkownik nie jest zalogowany, przekieruj na stronę logowania
        router.push('/user/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Czyszczenie subskrypcji
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/user/signin'); // Przekierowanie po wylogowaniu
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error.message);
    }
  };

  if (loading) {
    return <p>Ładowanie...</p>; // Wskazanie ładowania
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Witaj na swoim profilu!</h2>
        {user && (
          <div>
            <p className="mb-4"><strong>Email:</strong> {user.email}</p>
            <p className="mb-4"><strong>UID:</strong> {user.uid}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Wyloguj się
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
