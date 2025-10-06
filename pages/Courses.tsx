import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses, books } from '../data/db';
import { Course, CourseLevel, Book } from '../types';
import { useAuth } from '../hooks/useAuth';
import BookCard from '../components/BookCard';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const { isPremium } = useAuth();
    const isLocked = course.isPremium && !isPremium;

    return (
        <div className={`relative bg-card dark:bg-slate-800 rounded-2xl overflow-hidden border border-border dark:border-slate-700/50 transition-all duration-300 ${isLocked ? 'opacity-60' : 'hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 hover:shadow-cyan-500/10'}`}>
             {isLocked && (
                <div className="absolute top-4 right-4 bg-background dark:bg-[#0F172A] text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/50">
                    PREMIUM
                </div>
            )}
            <img className="h-48 w-full object-cover" src={course.image} alt={course.title} />
            <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground dark:text-slate-200 mb-2">{course.title}</h3>
                <div className="flex justify-between items-center text-sm text-muted-foreground dark:text-slate-400 mb-4">
                    <span>{course.duration}</span>
                    <span className="font-semibold">{course.level}</span>
                </div>
                <p className="text-muted-foreground dark:text-slate-400 text-sm mb-4 h-20 overflow-hidden">{course.description}</p>
                {isLocked ? (
                    <Link to="/subscription" className="w-full text-center block bg-muted dark:bg-slate-700 text-foreground dark:text-slate-200 font-semibold px-5 py-2 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        Desbloquear con Premium
                    </Link>
                ) : (
                    <Link to={`/courses/${course.id}`} className="w-full text-center inline-block bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-full text-sm transition-all duration-300 hover:bg-primary/80">
                        Ver Curso
                    </Link>
                )}
            </div>
        </div>
    );
};


const Courses: React.FC = () => {
    const [activeTab, setActiveTab] = useState<CourseLevel>(CourseLevel.Basic);

    const filteredCourses = courses.filter(course => course.level === activeTab);
    const filteredBooks = books.filter(book => book.level.includes(activeTab));
    const tabs = Object.values(CourseLevel);

    return (
        <div>
            <section className="bg-muted dark:bg-slate-800 py-12 border-b border-border dark:border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-foreground dark:text-slate-200 mb-2">Nuestros Cursos de Inglés</h1>
                    <p className="text-muted-foreground dark:text-slate-400">Selecciona tu nivel y comienza tu viaje de aprendizaje.</p>
                </div>
            </section>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex justify-center mb-12 flex-wrap gap-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-bold rounded-full transition-all duration-300 text-sm sm:text-base ${activeTab === tab ? 'bg-primary text-primary-foreground shadow-lg shadow-cyan-500/20' : 'bg-card dark:bg-slate-800 text-muted-foreground dark:text-slate-400 hover:bg-muted dark:hover:bg-slate-700 hover:text-foreground dark:hover:text-slate-200 border border-border dark:border-slate-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}
                </div>

                {filteredBooks.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-foreground dark:text-slate-200 mb-12">Libros Didácticos Recomendados</h2>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredBooks.map(book => <BookCard key={book.id} book={book} />)}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Courses;