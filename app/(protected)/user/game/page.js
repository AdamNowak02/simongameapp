'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function SimonGame() {
  const [user, setUser] = useState(null);
  const [sequence, setSequence] = useState([]); // Stores the sequence of colors
  const [playerInput, setPlayerInput] = useState([]); // Stores player input
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false); // Game over flag
  const [message, setMessage] = useState(""); // Message to show game over

  const colors = ['green', 'red', 'yellow', 'blue']; // Subtle colors

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch the user's best score
        const userDoc = await getDoc(doc(db, 'scores', currentUser.uid));
        if (userDoc.exists()) {
          setBestScore(userDoc.data().BestGamePoints || 0);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const startGame = () => {
    setSequence([]);
    setPlayerInput([]);
    setScore(0);
    setGameOver(false);
    setMessage(""); // Reset game over message
    setIsPlaying(true);
    addNewStep(); // Start the game with the first color
  };

  const addNewStep = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prev) => [...prev, randomColor]);
    setPlayerInput([]); // Reset player input when a new step is added
    playSequence([randomColor]); // Play the new color in the sequence
  };

  const playSequence = (sequence) => {
    let delay = 0;
    sequence.forEach((color) => {
      setTimeout(() => highlightButton(color), delay);
      delay += 1000; // Flash each color one by one with a delay of 1 second
    });
  };

  const highlightButton = (color) => {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add('active');
      setTimeout(() => button.classList.remove('active'), 500); // Flash for 500ms
    }
  };

  const handleButtonClick = (color) => {
    if (!isPlaying || gameOver) return;

    const newPlayerInput = [...playerInput, color];
    setPlayerInput(newPlayerInput);

    // If the clicked color is the correct one
    if (color === sequence[playerInput.length - 1]) {
      // If the player has finished the whole sequence correctly
      if (newPlayerInput.length === sequence.length) {
        setScore((prev) => prev + 1); // Increase score
        setPlayerInput([]); // Reset player input
        setTimeout(() => addNewStep(), 1000); // Add new step after a short delay
      }
    } else {
      // Incorrect input, end game
      setGameOver(true);
      setMessage("Game Over!"); // Show game over message
      endGame();
    }
  };

  const endGame = async () => {
    setIsPlaying(false);

    if (user) {
      const newBestScore = Math.max(score, bestScore);
      setBestScore(newBestScore);

      // Update Firestore with the latest scores
      await setDoc(doc(db, 'scores', user.uid), {
        BestGamePoints: newBestScore,
        LastGamePoints: score,
        user: user.uid,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Simon Game</h1>
      <div className="relative w-96 h-96 rounded-full border-4 border-black flex items-center justify-center">
        {colors.map((color, index) => (
          <div
            key={color}
            id={color}
            onClick={() => handleButtonClick(color)}
            className={`absolute w-full h-full cursor-pointer transition-all ${color} rounded-full`}
            style={{
              clipPath: `polygon(50% 50%, 0% 0%, 50% 0%, 50% 50%)`,
              backgroundColor: color,
              transform: `rotate(${index * 90}deg)`,
              transformOrigin: 'center',
            }}
          ></div>
        ))}
        <div className="absolute w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <p className="text-xl font-bold">Simon</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {gameOver ? 'Try Again' : 'Start Game'}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xl">Score: {score}</p>
        <p className="text-xl">Best Score: {bestScore}</p>
        {gameOver && <p className="text-2xl text-red-500">{message}</p>}
      </div>

      {/* Inline CSS styles for the active flashing effect */}
      <style jsx>{`
        .green {
          background-color: #28a745;
        }
        .red {
          background-color: #dc3545;
        }
        .yellow {
          background-color: #ffc107;
        }
        .blue {
          background-color: #007bff;
        }
        .active {
          opacity: 0.6;
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
