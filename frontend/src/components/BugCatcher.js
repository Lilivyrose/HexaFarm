import React, { useState, useEffect } from 'react';
import BackButton from './common/BackButton';
import '../styles/BugCatcher.css';

const BugCatcher = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [bugs, setBugs] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (!gameOver && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    useEffect(() => {
        if (!gameOver) {
            const bugInterval = setInterval(() => {
                createBug();
            }, 1000);

            return () => clearInterval(bugInterval);
        }
    }, [gameOver]);

    const createBug = () => {
        const newBug = {
            id: Date.now(),
            left: Math.random() * (window.innerWidth - 60),
            top: Math.random() * (window.innerHeight - 60),
            rotation: Math.random() * 360,
        };
        setBugs((prevBugs) => [...prevBugs, newBug]);

        setTimeout(() => {
            setBugs((prevBugs) => prevBugs.filter((bug) => bug.id !== newBug.id));
        }, 3000);
    };

    const catchBug = (bugId) => {
        setBugs((prevBugs) => prevBugs.filter((bug) => bug.id !== bugId));
        setScore((prevScore) => prevScore + 1);
    };

    const restartGame = () => {
        setScore(0);
        setGameOver(false);
        setBugs([]);
        setTimeLeft(30);
    };

    return (
        <div className="bug-catcher-container">
            <BackButton />
            <div className="game-header">
                <div className="score">Score: {score}</div>
                <div className="timer">Time: {timeLeft}s</div>
            </div>

            {!gameOver ? (
                <div className="game-area">
                    {bugs.map((bug) => (
                        <div
                            key={bug.id}
                            className="bug"
                            style={{
                                left: `${bug.left}px`,
                                top: `${bug.top}px`,
                                transform: `rotate(${bug.rotation}deg)`
                            }}
                            onClick={() => catchBug(bug.id)}
                        >
                            🐛
                        </div>
                    ))}
                </div>
            ) : (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>Final Score: {score}</p>
                    <button onClick={restartGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default BugCatcher; 