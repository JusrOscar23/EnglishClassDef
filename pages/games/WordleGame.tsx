import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWordleHint } from '../../services/geminiService';
import { audioService } from '../../services/audioService';

const wordList = [
    { word: 'APPLE', hint: 'Fruta común, a menudo roja o verde.', translation: 'Manzana' },
    { word: 'HOUSE', hint: 'Lugar donde vive una familia.', translation: 'Casa' },
    { word: 'GREEN', hint: 'Color de la hierba y las hojas.', translation: 'Verde' },
    { word: 'WATER', hint: 'Líquido esencial para la vida.', translation: 'Agua' },
    { word: 'MUSIC', hint: 'Sonidos organizados que expresan emociones.', translation: 'Música' },
    { word: 'HAPPY', hint: 'Sentimiento de alegría y satisfacción.', translation: 'Feliz' },
    { word: 'TABLE', hint: 'Mueble con una superficie plana y patas.', translation: 'Mesa' },
];

const BOARD_SIZE = 5;
const MAX_GUESSES = 6;

const WordleGame: React.FC = () => {
    const [solution, setSolution] = useState<{ word: string, hint: string, translation: string }>(wordList[0]);
    const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(''));
    const [currentRow, setCurrentRow] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({});
    const [hint, setHint] = useState('');
    const [isHintLoading, setIsHintLoading] = useState(false);


    const initializeGame = () => {
        audioService.playClick();
        const selected = wordList[Math.floor(Math.random() * wordList.length)];
        setSolution(selected);
        setGuesses(Array(MAX_GUESSES).fill(''));
        setCurrentRow(0);
        setGameOver(false);
        setIsWin(false);
        setUsedKeys({});
        setHint(`Pista: ${selected.hint}`);
    };
    
    useEffect(() => {
        initializeGame();
    }, []);

    const handleInput = (key: string) => {
        if (gameOver) return;
        audioService.playClick();

        if (key === 'Enter') {
            if (guesses[currentRow].length === BOARD_SIZE) {
                processGuess();
            }
        } else if (key === 'Backspace') {
            setGuesses(prev => {
                const newGuesses = [...prev];
                newGuesses[currentRow] = newGuesses[currentRow].slice(0, -1);
                return newGuesses;
            });
        } else if (guesses[currentRow].length < BOARD_SIZE && /^[A-Z]$/i.test(key)) {
             setGuesses(prev => {
                const newGuesses = [...prev];
                newGuesses[currentRow] += key.toUpperCase();
                return newGuesses;
            });
        }
    };
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
             if (e.repeat) return;
             handleInput(e.key);
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentRow, gameOver, guesses]);

    const processGuess = () => {
        const guess = guesses[currentRow];
        if (guess === solution.word) {
            audioService.playWin();
            setGameOver(true);
            setIsWin(true);
        } else if (currentRow === MAX_GUESSES - 1) {
            setGameOver(true);
        } else {
            audioService.playSuccess();
        }
        
        const newUsedKeys = { ...usedKeys };
        guess.split('').forEach((letter, i) => {
            if(solution.word[i] === letter) {
                newUsedKeys[letter] = 'correct';
            } else if (solution.word.includes(letter) && newUsedKeys[letter] !== 'correct') {
                newUsedKeys[letter] = 'present';
            } else if (!solution.word.includes(letter)) {
                 newUsedKeys[letter] = 'absent';
            }
        });
        setUsedKeys(newUsedKeys);
        setCurrentRow(prev => prev + 1);
    };
    
    const getTileClass = (letter: string, index: number, row: number) => {
        if (row >= currentRow) return 'border-slate-300 dark:border-slate-600';
        if (!solution.word.includes(letter)) return 'bg-slate-400 dark:bg-slate-600 text-white dark:text-slate-200 border-slate-400 dark:border-slate-600';
        if (solution.word[index] === letter) return 'bg-green-500 text-white border-green-500';
        return 'bg-yellow-500 text-white border-yellow-500';
    };

    const handleGeminiHint = async () => {
        audioService.playClick();
        setIsHintLoading(true);
        const geminiHint = await getWordleHint(solution.word);
        setHint(geminiHint);
        setIsHintLoading(false);
    };
    
    const keyboardRows = [
        'QWERTYUIOP'.split(''),
        'ASDFGHJKL'.split(''),
        ['Enter', ...'ZXCVBNM'.split(''), 'Backspace']
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-[#0F172A] flex flex-col items-center p-4">
            <div className="w-full max-w-lg self-start">
                <Link to="/games" className="text-primary hover:underline mb-4 inline-block font-semibold">
                    &larr; Volver a juegos
                </Link>
            </div>
            <div className="w-full max-w-lg bg-card dark:bg-slate-800 border border-border dark:border-slate-700/50 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                <h1 className="text-4xl font-bold text-foreground dark:text-slate-200">Wordle</h1>
                <p id="hint-display" className="text-lg text-muted-foreground dark:text-slate-400 my-4 h-12 flex justify-center items-center">{hint}</p>
                <button onClick={handleGeminiHint} disabled={isHintLoading} className="bg-gradient-to-r from-primary to-secondary text-white rounded-full py-2 px-6 font-bold text-sm shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 mb-8 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isHintLoading ? 'Generando...' : '✨ Obtener Pista de IA'}
                </button>
                
                <div className="grid grid-rows-6 gap-2 mb-8 mx-auto w-full max-w-sm">
                    {guesses.map((guess, i) => (
                        <div key={i} className="grid grid-cols-5 gap-2">
                            {Array.from({ length: BOARD_SIZE }).map((_, j) => (
                                <div key={j} className={`h-14 w-14 border-2 flex items-center justify-center font-bold text-2xl uppercase ${i < currentRow ? getTileClass(guess[j], j, i) : 'border-slate-300 dark:border-slate-600'} text-foreground dark:text-white`}>
                                    {guesses[i][j]}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                 <div className="space-y-2 max-w-lg mx-auto">
                    {keyboardRows.map((row, i) => (
                        <div key={i} className="flex justify-center gap-1 sm:gap-2">
                            {row.map(key => {
                                const keyClass = usedKeys[key] || '';
                                return (
                                    <button key={key} onClick={() => handleInput(key)} className={`h-12 flex-1 rounded-md font-semibold uppercase text-sm sm:text-base transition-colors
                                        ${keyClass === 'correct' ? 'bg-green-500 text-white' : ''}
                                        ${keyClass === 'present' ? 'bg-yellow-500 text-white' : ''}
                                        ${keyClass === 'absent' ? 'bg-slate-500 dark:bg-slate-700 text-white dark:text-slate-200' : ''}
                                        ${!keyClass ? 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-500 dark:hover:bg-slate-600 text-foreground dark:text-slate-200' : ''}`}>
                                        {key === 'Backspace' ? <i className="fas fa-backspace"></i> : key}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
                 {gameOver && (
                    <div className="mt-8">
                        <h2 className={`text-3xl font-bold ${isWin ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                            {isWin ? '¡Felicidades, ganaste! 🎉' : '¡Sigue intentando! 😔'}
                        </h2>
                        <p className="text-xl mt-2 text-foreground dark:text-slate-200">La palabra era: <span className="font-bold text-primary">{solution.word}</span> ({solution.translation})</p>
                        <button onClick={initializeGame} className="mt-4 bg-secondary text-secondary-foreground font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105 shadow-lg">
                            Jugar de Nuevo
                        </button>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default WordleGame;
