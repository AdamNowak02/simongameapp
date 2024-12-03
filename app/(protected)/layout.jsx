'use client';

import { useAuth } from "../lib/AuthContext"; // Poprawiona ścieżka do AuthContext
import { useLayoutEffect } from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

function Protected({ children }) {
  const { user } = useAuth(); // Sprawdzenie, czy użytkownik jest zalogowany
  const returnUrl = usePathname(); // Ścieżka, na którą użytkownik powinien wrócić po zalogowaniu

  useLayoutEffect(() => {
    if (!user) {
      // Jeśli użytkownik nie jest zalogowany, przekieruj do strony logowania
      redirect(`/user/signin?returnUrl=${returnUrl}`);
    }
  }, [user, returnUrl]);

  return (
    <>
      {children} {/* Renderowanie dzieci (strony) tylko, jeśli użytkownik jest zalogowany */}
    </>
  );
}

export default Protected;
