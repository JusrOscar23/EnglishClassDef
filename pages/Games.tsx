import React from 'react';
import { Link } from 'react-router-dom';
import { games } from '../data/db';
import { Game } from '../types';

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
    <div className="bg-card dark:bg-slate-800 rounded-2xl overflow-hidden border border-border dark:border-slate-700/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 hover:shadow-cyan-500/10">
        <img className="h-48 w-full object-cover" src={game.image} alt={game.title} />
        <div className="p-6">
            <h3 className="text-xl font-bold text-card-foreground dark:text-slate-200 mb-2">{game.title}</h3>
            <p className="text-muted-foreground dark:text-slate-400 text-sm mb-4 h-20 overflow-hidden">{game.description}</p>
            <Link to={game.path} className="w-full text-center inline-block bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-full text-sm transition-all duration-300 hover:bg-primary/80">
                Jugar Ahora
            </Link>
        </div>
    </div>
);


const Games: React.FC = () => {
    return (
         <div>
            <section className="bg-muted dark:bg-slate-800 py-12 border-b border-border dark:border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-foreground dark:text-slate-200 mb-2">Aprende Jugando</h1>
                    <p className="text-muted-foreground dark:text-slate-400">Diviértete y mejora tu inglés con nuestra selección de juegos educativos.</p>
                </div>
            </section>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {games.map(game => <GameCard key={game.id} game={game} />)}
                </div>
            </main>
        </div>
    );
};

export default Games;