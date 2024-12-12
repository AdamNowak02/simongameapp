'use client';

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState(null); // Obsługa błędów rejestracji
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setRegisterError('Hasła się nie zgadzają!');
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);

      await sendEmailVerification(auth.currentUser);
      console.log('Email verification sent');

      // Wyloguj użytkownika po rejestracji
      await signOut(auth);
      router.push('/user/verfiy'); // Przekierowanie na stronę weryfikacji
    } catch (error) {
      console.error('Błąd rejestracji:', error.message);
      setRegisterError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Rejestracja</h2>
        {registerError && <p className="text-red-500 text-sm mb-4">{registerError}</p>}
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
        <div className="mb-4">
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
            Powtórz hasło
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Powtórz hasło"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Zarejestruj
          </button>
        </div>
      </form>
    </div>
  );
}
