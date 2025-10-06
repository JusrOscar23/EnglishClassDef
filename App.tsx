import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Games from './pages/Games';
import MemoryGame from './pages/games/MemoryGame';
import WordleGame from './pages/games/WordleGame';
import HangmanGame from './pages/games/HangmanGame';
import SentenceScramble from './pages/games/SentenceScramble';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import Subscription from './pages/Subscription';

// Fix: Refactored component to use React.FC for consistency and to resolve JSX namespace error.
const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route path="games" element={<Games />} />
            <Route path="games/memory" element={<MemoryGame />} />
            <Route path="games/wordle" element={<WordleGame />} />
            <Route path="games/hangman" element={<HangmanGame />} />
            <Route path="games/scramble" element={<SentenceScramble />} />
            <Route path="videos" element={<Videos />} />
            <Route path="contact" element={<Contact />} />
            <Route path="subscription" element={<Subscription />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;