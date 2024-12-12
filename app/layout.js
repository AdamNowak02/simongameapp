// app/layout.js
import './globals.css'; // Importujemy style Tailwind
import { AuthProvider } from './lib/AuthContext'; // Importujemy AuthProvider
import Navbar from './navbar'; // Poprawiona ścieżka do komponentu Navbar

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
            <h1 className="text-lg font-bold">Frontend Laboratory App</h1>
          </header>

          {/* Główna sekcja z paskiem bocznym */}
          <div className="flex flex-grow">
            {/* Pasek boczny */}
            <aside className="bg-gray-200 w-60 p-4">
              <nav className="flex flex-col space-y-4">
                <Navbar /> {/* Wywołanie komponentu Navbar, który wyświetli odpowiednie przyciski */}
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
