import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface AppContextType {
  isPremium: boolean;
  login: () => void;
  isTutorOpen: boolean;
  openTutor: () => void;
  closeTutor: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextType>({
  isPremium: false,
  login: () => {},
  isTutorOpen: false,
  openTutor: () => {},
  closeTutor: () => {},
  theme: 'dark',
  toggleTheme: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });

  useEffect(() => {
    const premiumStatus = localStorage.getItem('isPremium');
    if (premiumStatus === 'true') {
      setIsPremium(true);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const login = () => {
    localStorage.setItem('isPremium', 'true');
    setIsPremium(true);
  };

  const openTutor = () => setIsTutorOpen(true);
  const closeTutor = () => setIsTutorOpen(false);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  return (
    <AppContext.Provider value={{ isPremium, login, isTutorOpen, openTutor, closeTutor, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};