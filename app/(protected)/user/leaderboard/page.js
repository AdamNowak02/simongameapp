'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase'; // Import Firestore
import { collection, getDocs, query, orderBy } from 'firebase/firestore'; // Funkcje Firestore
import { useRouter } from 'next/navigation'; // Funkcja do nawigacji w Next.js

export default function LeaderboardPage() {
  const [scores, setScores] = useState([]);
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

        setScores(scoresList);
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
    <div className="flex flex-col justify-center items-center h-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Tabela wyników</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Miejsce</th>
              <th className="py-2 px-4 border-b">Nazwa użytkownika</th>
              <th className="py-2 px-4 border-b">Punkty</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{score.username}</td>
                <td className="py-2 px-4 border-b">{score.BestGamePoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
