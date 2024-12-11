// app/(protected)/layout.jsx
'use client';

import { useLayoutEffect } from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from "../lib/AuthContext"; // Importuj useAuth z poprawnej ścieżki

// Komponent chroniony, który sprawdza, czy użytkownik jest zalogowany
function Protected({ children }) {
  const { user, loading } = useAuth(); // Używamy hooka useAuth, żeby dostać użytkownika i stan ładowania

  const returnUrl = usePathname(); // Pobieramy bieżącą ścieżkę, aby móc ją przekazać po przekierowaniu

  useLayoutEffect(() => {
    if (loading) return;  // Czekamy, aż stan ładowania się zakończy
    if (!user) {
      redirect(`/user/signin?returnUrl=${returnUrl}`); // Jeśli nie ma użytkownika, przekierowujemy na stronę logowania
    }
  }, [user, loading, returnUrl]); // Działamy na zmianie stanu usera lub loading

  return <>{children}</>; // Zwracamy dzieci (czyli całą resztę aplikacji)
}

export default Protected;
