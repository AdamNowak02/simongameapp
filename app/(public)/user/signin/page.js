'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Inicjalizacja useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset błędu
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Zalogowano:', userCredential.user);
      // Przekierowanie do profilu
      router.push('/user/profile');

    } catch (error) {
      console.error('Błąd logowania:', error.message);
      setError('Nieprawidłowy email lub hasło'); // Komunikat błędu
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Logowanie</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Wprowadź email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Hasło
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Wprowadź hasło"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Zaloguj
          </button>
        </div>
      </form>
    </div>
  );
}
