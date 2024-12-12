"use client";

// lib/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from './firebase'; // Upewnij się, że masz poprawną ścieżkę do konfiguracji Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Tworzenie kontekstu dla autoryzacji
const AuthContext = createContext();

// Komponent, który otacza aplikację i zapewnia dostęp do stanu użytkownika
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Zmiana stanu użytkownika przy każdym logowaniu / wylogowaniu
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children} {/* Przekazujemy dzieci do komponentów wewnętrznych */}
    </AuthContext.Provider>
  );
};

// Hook, który pozwala uzyskać dostęp do stanu użytkownika w aplikacji
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


