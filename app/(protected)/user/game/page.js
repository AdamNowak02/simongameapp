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

  const colors = ['green', 'red', 'yellow', 'blue']; // Colors available in the game

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch the user's best score from Firebase
        const userDoc = await getDoc(doc(db, 'scores', currentUser.uid));
        if (userDoc.exists()) {
          setBestScore(userDoc.data().BestGamePoints || 0);
        }
      }
    });

    return () => unsubscribe();
  }, []);



  // Start the game logic
  const startGame = () => {
  
    setTimeout(() => {
      setIsPlaying(true); // Start the game after a small delay for UX
      addNewStep(); // Begin the game with the first color in the sequence
    }, 500); // Short delay before starting the game
  };

  // Add a new random color to the sequence
  const addNewStep = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...sequence, randomColor]; // Add the new color to the sequence
    setSequence(newSequence);
    setPlayerInput([]); // Clear player input for the new round
    playSequence(newSequence); // Play the sequence
  };

  // Play the sequence of colors
  const playSequence = (sequence) => {
    let delay = 0;
    sequence.forEach((color) => {
      setTimeout(() => highlightButton(color), delay);
      delay += 1000; // Flash each color with a 1-second delay
    });
  };

  // Highlight a button
  const highlightButton = (color) => {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add('active');
      setTimeout(() => button.classList.remove('active'), 500); // Flash for 500ms
    }
  };

  // Handle user input when a color is clicked
  const handleButtonClick = (color) => {
    if (!isPlaying || gameOver) return;

    const newPlayerInput = [...playerInput, color];
    setPlayerInput(newPlayerInput);

    // Check if the player's input matches the sequence so far
    if (color === sequence[newPlayerInput.length - 1]) {
      // If the player has completed the entire sequence
      if (newPlayerInput.length === sequence.length) {
        setScore((prev) => prev + 1); // Increase the score
        setTimeout(() => addNewStep(), 1000); // Add a new step after a short delay
      }
    } else {
      // If the input is incorrect, end the game
      setGameOver(true);
      setMessage("Game Over!"); // Show game over message
      endGame();
    }
  };

  // End the game and save the score
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

  // Refresh the page when the "Try Again" button is clicked
  const handleTryAgain = () => {
    window.location.reload(); // Reload the page to restart the game
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Gra Simon</h1>
      
      <div className="relative w-96 h-96 rounded-full border-4 border-black flex items-center justify-center">
        {colors.map((color, index) => (
          <div
            key={color}
            id={color}
            onClick={() => handleButtonClick(color)}
            className={`absolute w-full h-full cursor-pointer transition-all ${color} rounded-full`}
            style={{
              clipPath: `polygon(50% 50%, 100% 50%, 100% 0%, 50% 0%)`,
              backgroundColor: color,
              transform: `rotate(${index * 90}deg) translate(0%, 0%)`,
              transformOrigin: 'center',
            }}
          ></div>
        ))}
      <div className="absolute w-24 h-24 bg-white rounded-full flex items-center justify-center border-2 border-black">
  <p className="text-xl font-bold">Simon</p>
</div>

      </div>

      <div className="mt-8">
  {!gameOver ? (
    <button
      onClick={startGame}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      style={{ visibility: isPlaying ? 'hidden' : 'visible' }} // Ukrywa przycisk, gdy gra jest w toku
    >
      Rozpocznij
    </button>
  ) : (
    <button
      onClick={handleTryAgain} // Trigger page reload
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Spróbuj ponownie
    </button>
  )}
</div>



<div className="mt-8 text-center">
  <div className="mb-4">
    <p className="text-2xl font-semibold text-gray-700">Wynik: <span className="text-blue-500">{score}</span></p>
    <p className="text-2xl font-semibold text-gray-700">Najlepszy wynik: <span className="text-green-500">{bestScore}</span></p>
  </div>
  
  {gameOver && (
    <p className="text-3xl font-bold text-red-600 mt-4 animate-pulse">{message}</p>
  )}
</div>


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
          opacity: 0.4;
          transition: opacity 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
