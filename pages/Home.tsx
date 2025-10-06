import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courses, carouselImages } from '../data/db';
import { Course } from '../types';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-card dark:bg-slate-800 rounded-2xl overflow-hidden border border-border dark:border-slate-700/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 hover:shadow-cyan-500/10">
        <img className="h-48 w-full object-cover" src={course.image} alt={course.title} />
        <div className="p-6">
            <h3 className="text-xl font-bold text-card-foreground dark:text-slate-200 mb-2">{course.title}</h3>
            <p className="text-muted-foreground dark:text-slate-400 text-sm mb-4 h-20 overflow-hidden">{course.description}</p>
            <Link to={`/courses/${course.id}`} className="inline-block bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-full text-sm transition-all duration-300 hover:bg-primary/80 hover:px-6">
                Comenzar
            </Link>
        </div>
    </div>
);

const FeatureCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-card dark:bg-slate-800 p-6 rounded-2xl border border-border dark:border-slate-700/50 text-center transition-transform hover:-translate-y-2">
        <div className="text-primary text-4xl mb-4 inline-block">
            <i className={icon}></i>
        </div>
        <h3 className="text-xl font-bold text-foreground dark:text-slate-200 mb-2">{title}</h3>
        <p className="text-muted-foreground dark:text-slate-400">{children}</p>
    </div>
);

const Home: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const featuredCourses = courses.slice(0, 3);

    return (
        <div className="text-foreground dark:text-slate-200">
            {/* Hero Section */}
            <section className="relative text-center py-24 sm:py-32 lg:py-40 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">La Forma Inteligente de Aprender Inglés</h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-8">Cursos interactivos, juegos y un tutor de IA a tu disposición.</p>
                    <Link to="/courses" className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/30">
                        Explorar Cursos
                    </Link>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-20 bg-background dark:bg-[#0F172A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-foreground dark:text-slate-200 mb-12">Nuestros Cursos Populares</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredCourses.map(course => <CourseCard key={course.id} course={course} />)}
                    </div>
                </div>
            </section>
            
             {/* Why Choose Us Section */}
            <section className="py-20 bg-muted dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-foreground dark:text-slate-200 mb-12">¿Por Qué Elegir English Class?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard icon="fas fa-graduation-cap" title="Instructores Expertos">
                            Aprende de profesionales certificados con años de experiencia en la enseñanza del inglés.
                        </FeatureCard>
                        <FeatureCard icon="fas fa-gamepad" title="Divertido e Interactivo">
                            Nuestros juegos y lecciones interactivas hacen que el aprendizaje sea atractivo y efectivo.
                        </FeatureCard>
                        <FeatureCard icon="fas fa-robot" title="Aprendizaje con IA">
                            Obtén ayuda instantánea y práctica personalizada con nuestro tutor de IA integrado.
                        </FeatureCard>
                        <FeatureCard icon="fas fa-infinity" title="Contenido en Evolución">
                             Accede a nuevos cursos, lecciones y material de estudio que se añaden constantemente.
                        </FeatureCard>
                    </div>
                </div>
            </section>

             {/* Carousel */}
            <section className="py-20 bg-background dark:bg-[#0F172A]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl font-bold text-center text-foreground dark:text-slate-200 mb-12">Una Experiencia de Aprendizaje Completa</h2>
                    <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl border border-border dark:border-slate-700">
                        {carouselImages.map((img, index) => (
                            <div key={index} className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <h3 className="text-white text-3xl font-bold text-center drop-shadow-lg p-4">{img.text}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;