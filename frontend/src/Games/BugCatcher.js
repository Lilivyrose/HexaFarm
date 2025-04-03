import React, { useState, useEffect } from "react";
import "../styles/BugCatcher.css"; // Import CSS file
import BackButton from "../components/common/BackButton"; // Add this import

const bugTypes = [
  { emoji: "🐞", points: 1 },
  { emoji: "🦗", points: 2 },
  { emoji: "🐝", points: -5 },  // Changed to negative points
  { emoji: "🦋", points: -5 },  // Changed to negative points
  { emoji: "🕷️", points: 5 },
];

const BugCatcher = () => {
  const [bugs, setBugs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  // Spawn a random bug
  const spawnBug = () => {
    if (!isGameOver) {
      const randomBug = bugTypes[Math.floor(Math.random() * bugTypes.length)];
      const newBug = {
        id: Date.now(),
        x: Math.random() * window.innerWidth * 0.8, 
        y: Math.random() * window.innerHeight * 0.8, 
        type: randomBug.emoji,
        points: randomBug.points,
      };
      setBugs((prevBugs) => [...prevBugs, newBug]);

      // Remove bug after 3 seconds
      setTimeout(() => {
        setBugs((prevBugs) => prevBugs.filter((bug) => bug.id !== newBug.id));
      }, 3000);
    }
  };

  // Catch a bug
  const catchBug = (id, points) => {
    setBugs((prevBugs) => prevBugs.filter((bug) => bug.id !== id));
    setScore((prevScore) => Math.max(0, prevScore + points)); // Prevent score from going below 0
  };

  // Timer Countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsGameOver(true);
    }
  }, [timeLeft]);

  // Spawn bugs randomly
  useEffect(() => {
    const bugInterval = setInterval(spawnBug, 1000);
    if (isGameOver) clearInterval(bugInterval);
    return () => clearInterval(bugInterval);
  }, [isGameOver]);

  return (
    <div className="game-container" style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      position: 'relative' // Add this for back button positioning
    }}>
      {/* Add BackButton at the top */}
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <BackButton />
      </div>

      <h1 style={{ textAlign: 'center', color: '#2e7d32', marginTop: '40px' }}>Bug Catcher Game</h1>
      
      <div style={{ 
        color: '#ff4444', 
        textAlign: 'center',
        margin: '10px 0 20px',
        fontSize: '1.1rem',
        fontWeight: '500',
        padding: '10px',
        background: '#fff5f5',
        borderRadius: '8px'
      }}>
        Don't catch butterflies and bees - they help plants grow!
      </div>

      {/* Emoji container */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        margin: '20px 0',
        padding: '15px',
        background: '#f8fafb',
        borderRadius: '10px',
        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)'
      }}>
        {bugTypes.map((bug, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            background: bug.points < 0 ? '#ffe6e6' : '#e6ffe6',
            borderRadius: '8px',
            minWidth: '80px'
          }}>
            <span style={{ fontSize: '24px' }}>{bug.emoji}</span>
            <span style={{ 
              marginTop: '5px',
              color: bug.points < 0 ? '#ff4444' : '#2e7d32',
              fontWeight: '500'
            }}>
              {bug.points > 0 ? `+${bug.points}` : bug.points} pts
            </span>
          </div>
        ))}
      </div>

      {/* Game stats container */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px 0',
        padding: '15px',
        background: '#f8fafb',
        borderRadius: '10px',
        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)'
      }}>
        <p style={{ margin: 0, fontWeight: '500' }}>Time Left: {timeLeft}s</p>
        <p style={{ margin: 0, fontWeight: '500' }}>Score: {score}</p>
      </div>

      {isGameOver && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: '#f8fafb',
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <h2>Game Over! Final Score: {score}</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="restart-button"
            style={{
              background: '#2e7d32',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Restart Game
          </button>
        </div>
      )}

      {!isGameOver && (
        <div className="bug-container" style={{
          position: 'relative',
          height: '400px',
          background: '#f8fafb',
          borderRadius: '10px',
          margin: '20px 0',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)'
        }}>
          {bugs.map((bug) => (
            <div
              key={bug.id}
              className="bug"
              style={{ 
                position: 'absolute',
                left: `${bug.x}px`, 
                top: `${bug.y}px`,
                cursor: 'pointer',
                fontSize: '24px',
                transition: 'transform 0.2s'
              }}
              onClick={() => catchBug(bug.id, bug.points)}
            >
              {bug.type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BugCatcher;
