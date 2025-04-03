import React, { useState, useEffect } from "react";
import BackButton from '../components/common/BackButton';
import "../styles/MemoryGame.css";

const cardImages = [
  { src: "🌸", matched: false }, { src: "🌻", matched: false }, { src: "🌹", matched: false },
  { src: "🌼", matched: false }, { src: "🌺", matched: false }, { src: "🍀", matched: false },
  { src: "🌿", matched: false }, { src: "🌴", matched: false }, { src: "🍁", matched: false },
  { src: "🌾", matched: false }, { src: "🌷", matched: false }, { src: "🍂", matched: false },
  { src: "🌵", matched: false }, { src: "🌲", matched: false }, { src: "🍃", matched: false },
  { src: "🍇", matched: false }, { src: "🍉", matched: false }, { src: "🍎", matched: false }
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setScore(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    if (!disabled && card.id !== choiceOne?.id) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setScore(prevScore => prevScore + 1);
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="page-container" style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <div className="memory-game-container" style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <BackButton />
        </div>

        <h1 style={{ 
          textAlign: 'center', 
          color: '#2e7d32', 
          margin: '20px 0 30px',
          fontSize: '2.5rem'
        }}>
          Memory Game
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          margin: '20px 0',
          padding: '15px',
          background: '#f8fafb',
          borderRadius: '10px',
          fontSize: '1.2rem'
        }}>
          <p>Turns: {turns}</p>
          <p>Matches: {score}/18</p>
          <button onClick={shuffleCards} style={{
            background: '#2e7d32',
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            New Game
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '10px',
          padding: '20px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {cards.map(card => (
            <div 
              key={card.id}
              className={`memory-card ${card.matched ? 'matched' : ''} ${
                (choiceOne?.id === card.id || choiceTwo?.id === card.id) ? 'flipped' : ''
              }`}
              style={{
                aspectRatio: '1',
                background: 'white',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: '15px'
              }}
              onClick={() => handleChoice(card)}
            >
              {card.matched || card.id === choiceOne?.id || card.id === choiceTwo?.id ? (
                card.src
              ) : (
                '❓'
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;