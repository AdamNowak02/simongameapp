'use client'; // Używamy 'use client', aby upewnić się, że komponent działa tylko po stronie klienta

import { useAuth } from './lib/AuthContext'; // Hook z AuthContext
import { FaHome, FaSignInAlt, FaUserPlus, FaUser, FaGamepad } from 'react-icons/fa'; // Ikony dla przycisków

const Navbar = () => {
  const { user, loading } = useAuth(); // Uzyskujemy dostęp do stanu użytkownika i stanu ładowania

  // Jeśli stan użytkownika jeszcze się ładuje, nie renderujemy żadnych przycisków
  if (loading) {
    return null;
  }

  if (user) {
    // Jeśli użytkownik jest zalogowany, renderujemy linki do profilu i gry
    return (
      <>
        <a href="/user/profile" className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded">
          <FaUser /> <span>Profil</span>
        </a>
        <a href="/game" className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded">
          <FaGamepad /> <span>Gra</span>
        </a>
      </>
    );
  }

  // Jeśli użytkownik nie jest zalogowany, renderujemy linki do logowania i rejestracji
  return (
    <>
      <a href="/" className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded">
        <FaHome /> <span>Strona główna</span>
      </a>
      <a href="/user/signin" className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded">
        <FaSignInAlt /> <span>Logowanie</span>
      </a>
      <a href="/user/register" className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded">
        <FaUserPlus /> <span>Rejestracja</span>
      </a>
    </>
  );
};

export default Navbar;
