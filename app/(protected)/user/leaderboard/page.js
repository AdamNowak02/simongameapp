'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase'; // Import Firestore
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore'; // Funkcje Firestore
import { useRouter } from 'next/navigation'; // Funkcja do nawigacji w Next.js

export default function LeaderboardPage() {
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Pobieranie kolekcji scores, sortowanie po BestGamePoints w porządku malejącym
        const q = query(collection(db, 'scores'), orderBy('BestGamePoints', 'desc'));
        const querySnapshot = await getDocs(q);

        // Mapowanie wyników z Firestore na tablicę
        const scoresList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Zakładamy, że BestGamePoints jest w danych dokumentu
        }));

        // Pobieranie danych użytkowników z kolekcji users
        const userUIDs = scoresList.map((score) => score.user);
        const uniqueUserUIDs = [...new Set(userUIDs)]; // Usunięcie duplikatów UID

        const usersData = {};
        for (const uid of uniqueUserUIDs) {
          const userDocRef = doc(db, 'users', uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            usersData[uid] = userDocSnap.data();
          } else {
            usersData[uid] = {}; // Jeśli brak użytkownika, twórz pusty obiekt
          }
        }

        setScores(scoresList);
        setUsers(usersData);
      } catch (error) {
        setError('Błąd podczas pobierania wyników.');
        console.error('Error fetching scores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-6 text-center">Tabela wyników</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left border-b text-lg">Miejsce</th>
              <th className="py-3 px-6 text-left border-b text-lg">Zdjęcie</th>
              <th className="py-3 px-6 text-left border-b text-lg">Nazwa użytkownika</th>
              <th className="py-3 px-6 text-left border-b text-lg">Punkty</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => {
              const user = users[score.user] || {}; // Jeśli brak użytkownika, dajemy pusty obiekt
              let rowClass = ''; // Klasa dla tła wiersza

              // Kolory dla miejsc 1, 2, 3
              if (index === 0) {
                rowClass = 'bg-yellow-500'; // Złote tło dla 1 miejsca
              } else if (index === 1) {
                rowClass = 'bg-gray-400'; // Srebrne tło dla 2 miejsca
              } else if (index === 2) {
                rowClass = 'bg-orange-800'; // Brązowe tło dla 3 miejsca
              }

              return (
                <tr key={score.id} className={`${rowClass} hover:bg-gray-100`}>
                  <td className="py-3 px-6 border-b">{index + 1}</td>
                  <td className="py-3 px-6 border-b">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-gray-200" />
                    )}
                  </td>
                  <td className="py-3 px-6 border-b">{user.nickname || ''}</td>
                  <td className="py-3 px-6 border-b">{score.BestGamePoints}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
