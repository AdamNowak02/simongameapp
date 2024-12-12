'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../../lib/firebase'; // Import Firebase Authentication
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'; // Funkcje Firebase Authentication
import { db } from '../../../lib/firebase'; // Import Firestore
import { setDoc, doc, getDoc } from 'firebase/firestore'; // Funkcje Firestore
import { useRouter } from 'next/navigation'; // Funkcja do nawigacji w Next.js

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: '',
    street: '',
    city: '',
    zipCode: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Pobieranie danych adresowych z Firestore
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const address = docSnap.data().address || {};
          setFormData({
            displayName: currentUser.displayName || '',
            photoURL: currentUser.photoURL || '',
            street: address.street || '',
            city: address.city || '',
            zipCode: address.zipCode || '',
          });
        } else {
          // Jeśli dokument nie istnieje
          setFormData({
            displayName: currentUser.displayName || '',
            photoURL: currentUser.photoURL || '',
            street: '',
            city: '',
            zipCode: '',
          });
        }
      } else {
        router.push('/user/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/user/signin');
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Aktualizacja profilu użytkownika w Authentication
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      // Tworzenie/aktualizacja dokumentu w kolekcji users
      await setDoc(doc(db, 'users', user?.uid), {
        address: {
          city: formData.city,
          street: formData.street,
          zipCode: formData.zipCode,
        },
      });

      console.log('Profile and address updated successfully');
    } catch (error) {
      setError('Nie udało się zaktualizować profilu. Sprawdź swoje uprawnienia.');
      console.error('Error updating profile:', error.message);
    }
  };

  if (loading) {
    return <p>Ładowanie...</p>;
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
              Wyświetlana nazwa
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
              Link do zdjęcia
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

          {/* Dodane pola adresowe */}
          <div>
            <label htmlFor="street" className="block font-bold mb-2">
              Ulica
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label htmlFor="city" className="block font-bold mb-2">
              Miasto
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block font-bold mb-2">
              Kod pocztowy
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
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
