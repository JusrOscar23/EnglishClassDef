import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { audioService } from '../../services/audioService';

const sentences = [
    { spanish: 'El gato se sentó en la alfombra.', english: ['The', 'cat', 'sat', 'on', 'the', 'mat'] },
    { spanish: 'Me gusta leer libros.', english: ['I', 'like', 'to', 'read', 'books'] },
    { spanish: 'Ella está aprendiendo inglés.', english: ['She', 'is', 'learning', 'English'] },
    { spanish: '¿Cuál es tu color favorito?', english: ['What', 'is', 'your', 'favorite', 'color', '?'] },
    { spanish: 'Nosotros vamos a la escuela en autobús.', english: ['We', 'go', 'to', 'school', 'by', 'bus'] }
];

const shuffle = (array: string[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const SentenceScramble: React.FC = () => {
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [scrambled, setScrambled] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect', message: string } | null>(null);

    useEffect(() => {
        loadSentence(currentSentenceIndex);
    }, [currentSentenceIndex]);

    const loadSentence = (index: number) => {
        const sentence = sentences[index];
        let shuffledWords;
        // Ensure the shuffled version is different from the original
        do {
            shuffledWords = shuffle([...sentence.english]);
        } while (shuffledWords.join(' ') === sentence.english.join(' '));

        setScrambled(shuffledWords);
        setAnswer([]);
        setFeedback(null);
    };

    const handleWordClick = (word: string, from: 'scrambled' | 'answer', index: number) => {
        if (feedback) return;
        audioService.playClick();

        if (from === 'scrambled') {
            setAnswer([...answer, word]);
            setScrambled(scrambled.filter((_, i) => i !== index));
        } else {
            setScrambled([...scrambled, word]);
            setAnswer(answer.filter((_, i) => i !== index));
        }
    };
    
    const checkAnswer = () => {
        audioService.playClick();
        if(answer.join(' ') === sentences[currentSentenceIndex].english.join(' ')) {
            audioService.playSuccess();
            setFeedback({type: 'correct', message: '¡Excelente! La oración es correcta.'});
        } else {
            setFeedback({type: 'incorrect', message: 'No es del todo correcto. ¡Inténtalo de nuevo!'});
            setTimeout(() => setFeedback(null), 2000);
        }
    }

    const nextSentence = () => {
        audioService.playClick();
        const nextIndex = (currentSentenceIndex + 1) % sentences.length;
        setCurrentSentenceIndex(nextIndex);
    }
    
    return (
        <div className="min-h-screen bg-background dark:bg-[#0F172A] flex flex-col items-center p-4">
            <div className="w-full max-w-3xl self-start">
                <Link to="/games" className="text-primary hover:underline mb-4 inline-block font-semibold">
                    &larr; Volver a juegos
                </Link>
            </div>
            <div className="w-full max-w-3xl bg-card dark:bg-slate-800 border border-border dark:border-slate-700/50 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                <h1 className="text-4xl font-bold text-foreground dark:text-slate-200 mb-2">Sentence Scramble</h1>
                <p className="text-muted-foreground dark:text-slate-400 mb-6">Ordena las palabras para formar la oración correcta en inglés.</p>
                
                <div className="bg-muted dark:bg-slate-900 p-4 rounded-lg mb-8 shadow-inner">
                    <p className="text-lg text-muted-foreground dark:text-slate-400">Traducción:</p>
                    <p className="text-xl font-semibold text-foreground dark:text-slate-200">{sentences[currentSentenceIndex].spanish}</p>
                </div>

                <div className="bg-background dark:bg-[#0F172A] min-h-[7rem] p-4 rounded-lg flex flex-wrap justify-center items-center gap-3 mb-4 border-2 border-dashed border-border dark:border-slate-700">
                    {answer.map((word, index) => (
                        <button key={index} onClick={() => handleWordClick(word, 'answer', index)}
                            className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:-translate-y-1">
                            {word}
                        </button>
                    ))}
                </div>
                
                 <div className="min-h-[7rem] p-4 flex flex-wrap justify-center items-center gap-3 mb-8">
                    {scrambled.map((word, index) => (
                        <button key={index} onClick={() => handleWordClick(word, 'scrambled', index)}
                            className="bg-muted dark:bg-slate-700 border-2 border-border dark:border-slate-600 text-foreground dark:text-slate-200 font-bold py-2 px-4 rounded-lg shadow-sm transition-transform hover:scale-105">
                            {word}
                        </button>
                    ))}
                </div>
                
                {feedback ? (
                     <div className={`p-4 rounded-lg mb-6 text-white font-bold ${feedback.type === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {feedback.message}
                    </div>
                ) : (
                    <button onClick={checkAnswer} disabled={answer.length === 0}
                        className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105 shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Revisar
                    </button>
                )}

                {feedback?.type === 'correct' && (
                     <button onClick={nextSentence}
                        className="mt-4 bg-secondary text-secondary-foreground font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105 shadow-lg">
                        Siguiente Oración
                    </button>
                )}
            </div>
        </div>
    );
};

export default SentenceScramble;
