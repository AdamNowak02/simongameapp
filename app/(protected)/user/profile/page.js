'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../../lib/firebase'; // Upewnij się, że ścieżka jest poprawna
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null); // Przechowuje dane zalogowanego użytkownika
  const [loading, setLoading] = useState(true); // Do zarządzania stanem ładowania
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: '',
  });
  const [error, setError] = useState(null); // Do przechowywania błędów
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData({
          displayName: currentUser.displayName || '',
          photoURL: currentUser.photoURL || '',
        });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    updateProfile(user, {
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    })
      .then(() => {
        console.log('Profile updated');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) {
    return <p>Ładowanie...</p>; // Wskazanie ładowania
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        {user?.photoURL && (
          <div className="flex justify-center mb-6">
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          </div>
        )}
        <h2 className="text-xl font-bold mb-6 text-center">Witaj na swoim profilu!</h2>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block font-bold mb-2">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              readOnly
              className="border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="block font-bold mb-2">
              Photo URL
            </label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>



              {/* Dodanie statusu weryfikacji e-maila */}
        {user && (
          <div className="mb-4">
            <p className="font-semibold">
              Status weryfikacji e-maila:{" "}
              {user.emailVerified ? (
                <span className="text-green-500">Zweryfikowany</span>
              ) : (
                <span className="text-red-500">Niezweryfikowany</span>
              )}
            </p>
          </div>
        )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Zaktualizuj profil
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Wyloguj się
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
