import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isPremium, openTutor, theme, toggleTheme } = useAuth();

    const navItems = [
        { name: 'Inicio', path: '/' },
        { name: 'Cursos', path: '/courses' },
        { name: 'Juegos', path: '/games' },
        { name: 'Videos', path: '/videos' },
        { name: 'Contacto', path: '/contact' },
    ];

    const activeLinkClass = "text-primary";
    const inactiveLinkClass = "text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200";
    
    return (
        <header className="bg-background/80 dark:bg-[#0F172A]/80 backdrop-blur-sm border-b border-border dark:border-slate-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
                             <span className="font-bold text-2xl text-foreground dark:text-slate-200 tracking-wider">English <span className="text-primary">Class</span></span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} font-semibold text-sm transition-colors duration-300`}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                            <button onClick={openTutor} className={`${inactiveLinkClass} font-semibold text-sm transition-colors duration-300 flex items-center gap-2`}>
                                <i className="fa-solid fa-robot text-primary"></i>
                                AI Tutor
                            </button>
                             <button onClick={toggleTheme} className="text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200 w-10 h-10 rounded-full flex items-center justify-center">
                                {theme === 'dark' ? <i className="fas fa-sun text-lg"></i> : <i className="fas fa-moon text-lg"></i>}
                            </button>
                             {!isPremium && (
                                <NavLink
                                    to="/subscription"
                                    className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-full text-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                                >
                                    Premium
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-card dark:bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-foreground dark:text-slate-200 hover:bg-muted dark:hover:bg-slate-700 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-muted dark:bg-slate-700 text-primary' : 'text-muted-foreground dark:text-slate-400 hover:bg-muted dark:hover:bg-slate-700 hover:text-foreground dark:hover:text-slate-200'}`}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                         <button onClick={() => {openTutor(); setIsOpen(false);}} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-muted-foreground dark:text-slate-400 hover:bg-muted dark:hover:bg-slate-700 hover:text-foreground dark:hover:text-slate-200 flex items-center gap-2">
                             <i className="fa-solid fa-robot text-primary"></i>
                             AI Tutor
                         </button>
                         <button onClick={() => {toggleTheme(); setIsOpen(false);}} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-muted-foreground dark:text-slate-400 hover:bg-muted dark:hover:bg-slate-700 hover:text-foreground dark:hover:text-slate-200 flex items-center gap-2">
                             {theme === 'dark' ? <i className="fas fa-sun w-5 text-center"></i> : <i className="fas fa-moon w-5 text-center"></i>}
                             Cambiar Tema
                         </button>
                         {!isPremium && (
                            <NavLink
                                to="/subscription"
                                onClick={() => setIsOpen(false)}
                                className="bg-primary text-primary-foreground font-bold block w-full text-center mt-2 px-3 py-2 rounded-md text-base"
                            >
                                Premium
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;