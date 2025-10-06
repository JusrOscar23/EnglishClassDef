import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { audioService } from '../../services/audioService';

const wordsByLevel = {
    easy: [
        { word: 'CAT', category: 'Animal' }, { word: 'SUN', category: 'Nature' }, { word: 'BOOK', category: 'Object' },
    ],
    medium: [
        { word: 'PENCIL', category: 'School' }, { word: 'ORANGE', category: 'Fruit' }, { word: 'GUITAR', category: 'Music' },
    ],
    hard: [
        { word: 'ELEPHANT', category: 'Animal' }, { word: 'COMPUTER', category: 'Technology' }, { word: 'KNOWLEDGE', category: 'Concept' },
    ]
};
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const maxGuesses = 6;


const HangmanGame: React.FC = () => {
    const [level, setLevel] = useState<'easy' | 'medium' | 'hard' | null>(null);
    const [word, setWord] = useState<{ word: string, category: string } | null>(null);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useAuth();

    const isGameOver = wrongGuesses >= maxGuesses || (word && word.word.split('').every(l => guessedLetters.includes(l)));
    const isWinner = word && word.word.split('').every(l => guessedLetters.includes(l));

    useEffect(() => {
        if(isWinner) {
            audioService.playWin();
        }
    }, [isWinner]);

    const startGame = (selectedLevel: 'easy' | 'medium' | 'hard') => {
        audioService.playClick();
        setLevel(selectedLevel);
        const wordList = wordsByLevel[selectedLevel];
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        setWord(randomWord);
        setGuessedLetters([]);
        setWrongGuesses(0);
    };

    const handleGuess = (letter: string) => {
        if (isGameOver || guessedLetters.includes(letter)) return;
        audioService.playClick();

        setGuessedLetters([...guessedLetters, letter]);
        if (!word?.word.includes(letter)) {
            setWrongGuesses(prev => prev + 1);
        } else {
            audioService.playSuccess();
        }
    };
    
    const drawHangman = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = theme === 'dark' ? '#E2E8F0' : '#0F172A';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        // Gallow
        ctx.beginPath();
        ctx.moveTo(40, 330); ctx.lineTo(120, 330);
        ctx.moveTo(80, 330); ctx.lineTo(80, 50);
        ctx.lineTo(200, 50); ctx.lineTo(200, 90);
        ctx.stroke();

        if (wrongGuesses > 0) { // Head
            ctx.beginPath(); ctx.arc(200, 120, 30, 0, Math.PI * 2); ctx.stroke();
        }
        if (wrongGuesses > 1) { // Body
            ctx.beginPath(); ctx.moveTo(200, 150); ctx.lineTo(200, 230); ctx.stroke();
        }
        if (wrongGuesses > 2) { // Left Arm
            ctx.beginPath(); ctx.moveTo(200, 170); ctx.lineTo(150, 220); ctx.stroke();
        }
        if (wrongGuesses > 3) { // Right Arm
            ctx.beginPath(); ctx.moveTo(200, 170); ctx.lineTo(250, 220); ctx.stroke();
        }
        if (wrongGuesses > 4) { // Left Leg
            ctx.beginPath(); ctx.moveTo(200, 230); ctx.lineTo(150, 280); ctx.stroke();
        }
        if (wrongGuesses > 5) { // Right Leg
            ctx.beginPath(); ctx.moveTo(200, 230); ctx.lineTo(250, 280); ctx.stroke();
        }
    }

    useEffect(() => {
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) drawHangman(ctx);
        }
    }, [wrongGuesses, theme]);

    if (!level || !word) {
        return (
            <div className="min-h-screen bg-background dark:bg-[#0F172A] flex flex-col items-center justify-center p-4 text-center">
                 <div className="w-full max-w-4xl self-start">
                    <Link to="/games" className="text-primary hover:underline mb-4 inline-block font-semibold">
                        &larr; Volver a juegos
                    </Link>
                </div>
                <div className="bg-card dark:bg-slate-800 border border-border dark:border-slate-700 p-8 rounded-2xl shadow-xl w-full max-w-4xl">
                    <h1 className="text-4xl font-bold text-foreground dark:text-slate-200 mb-4">El Ahorcado</h1>
                    <p className="text-lg text-muted-foreground dark:text-slate-400 mb-8">¡Elige tu nivel para empezar a aprender!</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {(['easy', 'medium', 'hard'] as const).map(l => (
                            <div key={l} className="bg-muted dark:bg-slate-900 p-6 rounded-xl border-t-4 border-primary transition-transform hover:-translate-y-2">
                                <h3 className="text-2xl font-bold text-foreground dark:text-slate-200 capitalize mb-3">{l === 'easy' ? 'Básico' : l === 'medium' ? 'Intermedio' : 'Avanzado'}</h3>
                                <button onClick={() => startGame(l)} className="bg-primary text-primary-foreground font-bold py-2 px-6 rounded-full hover:bg-primary/80 transition-colors">Comenzar</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-background dark:bg-[#0F172A] flex flex-col items-center p-4">
            <div className="w-full max-w-4xl self-start">
                <Link to="/games" className="text-primary hover:underline mb-4 inline-block font-semibold">
                    &larr; Volver a juegos
                </Link>
            </div>
            <div className="w-full max-w-4xl bg-card dark:bg-slate-800 border border-border dark:border-slate-700/50 rounded-2xl shadow-xl p-6 sm:p-8">
                <h1 className="text-4xl font-bold text-center text-foreground dark:text-slate-200 mb-6">Encuentra la Palabra</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-muted dark:bg-slate-900 p-6 rounded-2xl shadow-inner flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-muted-foreground dark:text-slate-400 mb-4 bg-card dark:bg-slate-700 px-4 py-2 rounded-full">Pista: {word.category}</h2>
                        <canvas ref={canvasRef} width="300" height="350"></canvas>
                    </div>

                    <div className="flex flex-col items-center justify-between">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                            {word.word.split('').map((letter, i) => (
                                <span key={i} className="w-10 h-12 sm:w-12 sm:h-14 border-b-4 border-slate-300 dark:border-slate-600 flex items-center justify-center font-bold text-2xl sm:text-3xl text-foreground dark:text-slate-200">
                                    {guessedLetters.includes(letter) ? letter : ''}
                                </span>
                            ))}
                        </div>
                        {isGameOver ? (
                             <div className="text-center">
                                <h2 className={`text-3xl font-bold mb-4 ${isWinner ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                    {isWinner ? '¡Ganaste! 🎉' : 'Juego Terminado 😔'}
                                </h2>
                                {!isWinner && <p className="mb-4 text-foreground dark:text-slate-200">La palabra era: <span className="font-bold">{word.word}</span></p>}
                                <button onClick={() => startGame(level as 'easy' | 'medium' | 'hard')} className="bg-secondary text-secondary-foreground font-bold py-2 px-6 rounded-full hover:bg-secondary/80 transition-colors">Jugar de Nuevo</button>
                            </div>
                        ) : (
                             <div className="grid grid-cols-7 sm:grid-cols-9 gap-2 w-full max-w-md">
                                {alphabet.map(letter => {
                                    const isGuessed = guessedLetters.includes(letter);
                                    let btnClass = 'bg-muted dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-foreground dark:text-slate-200';
                                    if (isGuessed) {
                                        btnClass = word.word.includes(letter) ? 'bg-green-500 text-white' : 'bg-slate-300 dark:bg-slate-900 text-slate-500 dark:text-slate-500';
                                    }
                                    
                                    return (
                                        <button key={letter} onClick={() => handleGuess(letter)} disabled={isGuessed}
                                                className={`h-12 w-full rounded-lg font-bold border border-border dark:border-slate-600 transition ${btnClass} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                            {letter}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HangmanGame;
