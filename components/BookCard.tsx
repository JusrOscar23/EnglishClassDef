import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types';
import { useAuth } from '../hooks/useAuth';

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const { isPremium } = useAuth();
    const isLocked = book.isPremium && !isPremium;

    return (
        <div className={`relative group transition-all duration-300 ${isLocked ? 'opacity-70' : ''}`}>
             <div className="bg-card dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-border dark:border-slate-700/50 transform group-hover:-translate-y-2 transition-transform duration-300">
                <img className="h-64 w-full object-cover" src={book.coverImage} alt={book.title} />
                <div className="p-4">
                    <h4 className="font-bold text-md text-card-foreground dark:text-slate-200 truncate">{book.title}</h4>
                    <p className="text-sm text-muted-foreground dark:text-slate-400">{book.author}</p>
                </div>
            </div>
             {isLocked && (
                <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center text-center p-4">
                    <i className="fas fa-lock text-white text-3xl mb-4"></i>
                    <h4 className="font-bold text-white text-lg">{book.title}</h4>
                    <Link to="/subscription" className="mt-4 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-full text-sm">
                        Desbloquear
                    </Link>
                </div>
            )}
        </div>
    )
}

export default BookCard;