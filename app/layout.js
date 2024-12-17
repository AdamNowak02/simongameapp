'use client'; // Używamy 'use client', aby upewnić się, że komponent działa tylko po stronie klienta

import { useState } from 'react'; // Hook do zarządzania stanem
import './globals.css'; // Importujemy style Tailwind
import { AuthProvider } from './lib/AuthContext'; // Importujemy AuthProvider
import Navbar from './navbar'; // Poprawiona ścieżka do komponentu Navbar

export default function RootLayout({ children }) {
  // Stan do zarządzania widocznością menu
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  // Funkcja do zamykania menu po kliknięciu w element menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        {/* AuthProvider otacza całą aplikację */}
        <AuthProvider>
          {/* Górny pasek */}
          <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-lg font-bold">Frontend Laboratory App</h1>

            {/* Ikona hamburgera (tylko na urządzeniach mobilnych) */}
            <div className="lg:hidden">
              <button
                id="hamburgerButton"
                className="text-white"
                onClick={toggleMenu} // Toggle visibility of the mobile menu
              >
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </header>

          {/* Główna sekcja z paskiem bocznym */}
          <div className="flex flex-grow">
            {/* Pasek boczny (widoczny na desktopie, ukryty na mobilkach) */}
            <aside className="bg-gray-200 w-60 p-4 lg:block hidden">
              <nav className="flex flex-col space-y-4">
                <Navbar closeMenu={closeMenu} /> {/* Wywołanie komponentu Navbar */}
              </nav>
            </aside>

            {/* Główne menu na urządzeniach mobilnych */}
            <aside
              id="mobileMenu"
              className={`lg:hidden fixed top-0 left-0 w-full bg-blue-600 p-4 z-50 ${menuOpen ? 'block' : 'hidden'}`}
            >
              {/* Przycisk zamykania menu (po prawej stronie) */}
              <div className="flex justify-end">
                <button
                  className="text-white mb-4"
                  onClick={closeMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Menu rozwijane */}
              <nav className="flex flex-col space-y-4">
                <Navbar closeMenu={closeMenu} /> {/* Przekazujemy funkcję zamykania menu */}
              </nav>
            </aside>

            {/* Główna zawartość */}
            <main className="flex-grow bg-white p-6">{children}</main>
          </div>

          {/* Stopka */}
          <footer className="bg-blue-600 text-white py-4 text-center">
            &copy; {new Date().getFullYear()} Frontend Laboratory App
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
