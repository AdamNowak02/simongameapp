'use client'; // Używamy 'use client', aby upewnić się, że komponent działa tylko po stronie klienta

import { useAuth } from './lib/AuthContext'; // Hook z AuthContext
import { FaHome, FaSignInAlt, FaUserPlus, FaUser, FaGamepad, FaListAlt } from 'react-icons/fa'; // Ikony dla przycisków
import Link from 'next/link';

const Navbar = ({ closeMenu }) => { // Dodajemy closeMenu jako prop
  const { user, loading } = useAuth(); // Uzyskujemy dostęp do stanu użytkownika i stanu ładowania

  // Jeśli stan użytkownika jeszcze się ładuje, nie renderujemy żadnych przycisków
  if (loading) {
    return null;
  }

  if (user) {
    // Jeśli użytkownik jest zalogowany, renderujemy linki do profilu i gry
    return (
      <>
        <Link
          href="/user/profile"
          className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded"
          onClick={closeMenu} // Wywołujemy closeMenu przy kliknięciu
        >
          <FaUser /> <span>Profil</span>
        </Link>
        <Link
          href="/user/game"
          className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded"
          onClick={closeMenu} // Wywołujemy closeMenu przy kliknięciu
        >
          <FaGamepad /> <span>Gra</span>
        </Link>
        <Link
          href="/user/leaderboard"
          className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded"
          onClick={closeMenu} // Wywołujemy closeMenu przy kliknięciu
        >
          <FaListAlt /> <span>Tabela wyników</span>
        </Link>
      </>
    );
  }

  // Jeśli użytkownik nie jest zalogowany, renderujemy linki do logowania i rejestracji
  return (
    <>
      <Link
        href="/"
        className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded"
        onClick={closeMenu} // Wywołujemy closeMenu przy kliknięciu
      >
        <FaHome /> <span>Strona główna</span>
      </Link>
      <Link
        href="/user/signin"
        className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded"
        onClick={closeMenu} // Wywołujemy closeMenu przy kliknięciu
      >
        <FaSignInAlt /> <span>Logowanie</span>
      </Link>
      <Link
        href="/user/register"
        className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded"
        onClick={closeMenu} // Wywołujemy closeMenu przy kliknięciu
      >
        <FaUserPlus /> <span>Rejestracja</span>
      </Link>
    </>
  );
};

export default Navbar;
