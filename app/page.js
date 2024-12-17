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
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </Link>
      </footer>
    </div>
  );
}
