import React, { createContext, useState, useEffect, useContext } from 'react';  // Importuj createContext i useContext z React
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Sprawdź, czy ścieżka jest poprawna

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Zwraca kontekst użytkownika
