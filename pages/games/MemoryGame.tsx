import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { audioService } from '../../services/audioService';

interface Card {
  id: number;
  word: string;
  translation: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const wordBank = [
    { word: "Hello", translation: "Hola", emoji: "👋" },
    { word: "Goodbye", translation: "Adiós", emoji: "👋" },
    { word: "Thank you", translation: "Gracias", emoji: "🙏" },
    { word: "Please", translation: "Por favor", emoji: "🥺" },
    { word: "Sorry", translation: "Lo siento", emoji: "😔" },
    { word: "Friend", translation: "Amigo", emoji: "👫" },
    { word: "Family", translation: "Familia", emoji: "👨‍👩‍👧‍👦" },
    { word: "Love", translation: "Amor", emoji: "❤️" },
];

const createGameBoard = (): Card[] => {
  const duplicatedWords = [...wordBank, ...wordBank];
  const shuffled = duplicatedWords.sort(() => 0.5 - Math.random());
  return shuffled.map((item, index) => ({
    ...item,
    id: index,
    isFlipped: false,
    isMatched: false,
  }));
};

const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<Card[]>(createGameBoard());
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [pairs, setPairs] = useState(0);
    const [isBoardLocked, setIsBoardLocked] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);

    useEffect(() => {
        if (flippedCards.length === 2) {
            setIsBoardLocked(true);
            setAttempts(prev => prev + 1);
            checkForMatch();
        }
    }, [flippedCards]);
    
    useEffect(() => {
        if (pairs > 0 && pairs === wordBank.length) {
            setIsGameWon(true);
            audioService.playWin();
        }
    }, [pairs])

    const handleCardClick = (id: number) => {
        if (isBoardLocked || cards[id].isFlipped || cards[id].isMatched) return;
        
        audioService.playFlip();

        const newCards = cards.map(card =>
            card.id === id ? { ...card, isFlipped: true } : card
        );
        setCards(newCards);
        setFlippedCards([...flippedCards, id]);
    };

    const checkForMatch = () => {
        const [firstId, secondId] = flippedCards;
        const firstCard = cards[firstId];
        const secondCard = cards[secondId];

        if (firstCard.word === secondCard.word) {
            audioService.playSuccess();
            audioService.speakWord(firstCard.word);
            const newCards = cards.map(card =>
                card.word === firstCard.word ? { ...card, isMatched: true } : card
            );
            setCards(newCards);
            setPairs(prev => prev + 1);
            resetFlippedCards();
        } else {
            setTimeout(() => {
                const newCards = cards.map(card =>
                    card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card
                );
                setCards(newCards);
                resetFlippedCards();
            }, 1200);
        }
    };
    
    const resetFlippedCards = () => {
        setFlippedCards([]);
        setIsBoardLocked(false);
    }

    const resetGame = () => {
        audioService.playClick();
        setCards(createGameBoard());
        setFlippedCards([]);
        setAttempts(0);
        setPairs(0);
        setIsBoardLocked(false);
        setIsGameWon(false);
    };

    return (
        <div className="min-h-screen bg-background dark:bg-[#0F172A] flex flex-col items-center p-4">
             <div className="w-full max-w-5xl self-start">
                <Link to="/games" className="text-primary hover:underline mb-4 inline-block font-semibold">
                    &larr; Volver a juegos
                </Link>
            </div>
            <div className="w-full max-w-5xl bg-card dark:bg-slate-800 border border-border dark:border-slate-700/50 rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-foreground dark:text-slate-200">Juego de Memoria</h1>
                    <p className="text-muted-foreground dark:text-slate-400 mt-2">Encuentra las parejas de palabras para ganar.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
                    <div className="bg-muted dark:bg-slate-900 p-3 rounded-lg text-foreground dark:text-slate-200"><span className="font-bold">Pares: {pairs} / {wordBank.length}</span></div>
                    <div className="bg-muted dark:bg-slate-900 p-3 rounded-lg text-foreground dark:text-slate-200"><span className="font-bold">Intentos: {attempts}</span></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {cards.map(card => (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className="h-40 rounded-lg cursor-pointer [perspective:1000px]"
                        >
                            <div
                                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${(card.isFlipped || card.isMatched) ? '[transform:rotateY(180deg)]' : ''}`}
                            >
                                {/* Card Back */}
                                <div className="absolute w-full h-full rounded-lg flex flex-col items-center justify-center p-2 text-center [backface-visibility:hidden] bg-gradient-to-br from-primary to-secondary">
                                    <span className="font-bold text-2xl text-primary-foreground tracking-wider">English <span className="text-white">Class</span></span>
                                </div>
                                {/* Card Front */}
                                <div className={`absolute w-full h-full rounded-lg flex flex-col items-center justify-center p-2 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-muted dark:bg-slate-900 border-2 ${card.isMatched ? 'border-green-500' : 'border-border dark:border-slate-700'}`}>
                                    <div className="text-xl font-bold">{card.word}</div>
                                    <div className="text-sm">{card.translation}</div>
                                    <div className="text-3xl mt-2">{card.emoji}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                 {isGameWon && (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-4">¡Felicidades! 🎉</h2>
                    </div>
                )}
                
                <div className="text-center mt-6">
                     <button onClick={resetGame} className="bg-secondary text-secondary-foreground font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105 shadow-lg">
                        Nuevo Juego
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemoryGame;