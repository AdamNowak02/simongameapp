import Image from "next/image";
import Link from "next/link"; // Importujemy Link z Next.js, aby ułatwić nawigację

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Simon Game</h1>
        <p className="text-lg text-center">Dołącz aby kontynuować</p>

        <div className="flex gap-6 items-center flex-col mt-8">
          <Link
            href="/user/signin"
            className="w-64 text-center py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Zaloguj
          </Link>
          <Link
            href="/user/register"
            className="w-64 text-center py-3 rounded-lg bg-green-600 text-white text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Zarejestruj
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Adam Nowak</p>
      </footer>
    </div>
  );
}
