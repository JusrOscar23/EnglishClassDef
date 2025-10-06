const playSound = (id: string) => {
    const audio = document.getElementById(id) as HTMLAudioElement;
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => console.error(`Error playing sound ${id}:`, error));
    }
};

const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Speech synthesis not supported in this browser.');
    }
}

export const audioService = {
    playClick: () => playSound('audio-click'),
    playFlip: () => playSound('audio-flip'),
    playSuccess: () => playSound('audio-success'),
    playWin: () => playSound('audio-win'),
    speakWord: (word: string) => speakWord(word),
};