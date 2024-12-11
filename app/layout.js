// app/layout.js
import './globals.css'; // Importujemy style Tailwind
import { FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { AuthProvider } from './lib/AuthContext';
 // Upewnij się, że ścieżka jest poprawna

export const metadata = {
  title: 'Frontend Laboratory App',
  description: 'Aplikacja laboratoryjna z Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        {/* AuthProvider otacza całą aplikację */}
        <AuthProvider>
          {/* Górny pasek */}
          <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-lg font-bold">FrontendLaboratoryApp</h1>
            <div className="flex space-x-4">
              <a href="/user/signin" className="flex items-center space-x-2 hover:underline">
                <FaSignInAlt /> <span>Logowanie</span>
              </a>
              <a href="/user/register" className="flex items-center space-x-2 hover:underline">
                <FaUserPlus /> <span>Rejestracja</span>
              </a>
            </div>
          </header>

          {/* Główna sekcja z paskiem bocznym */}
          <div className="flex flex-grow">
            {/* Pasek boczny */}
            <aside className="bg-gray-200 w-60 p-4">
              <nav className="flex flex-col space-y-4">
                <a href="/" className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded">
                  <FaHome /> <span>Strona główna</span>
                </a>
                <a href="/user/signin" className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded">
                  <FaSignInAlt /> <span>Logowanie</span>
                </a>
                <a href="/user/register" className="flex items-center space-x-2 hover:bg-gray-300 p-2 rounded">
                  <FaUserPlus /> <span>Rejestracja</span>
                </a>
              </nav>
            </aside>

            {/* Główna zawartość */}
            <main className="flex-grow bg-white p-6">{children}</main>
          </div>

          {/* Stopka */}
          <footer className="bg-blue-600 text-white py-4 text-center">
            &copy; {new Date().getFullYear()} FrontendLaboratoryApp
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
