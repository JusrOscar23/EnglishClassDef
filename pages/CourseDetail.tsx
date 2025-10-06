import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courses } from '../data/db';
import { useAuth } from '../hooks/useAuth';
import { Lesson, QuizQuestion } from '../types';
import Modal from '../components/Modal';
import { audioService } from '../services/audioService';

const LessonTypeIcon: React.FC<{ type: Lesson['type'] }> = ({ type }) => {
    const iconMap = {
        video: 'fas fa-play-circle',
        reading: 'fas fa-book-open',
        quiz: 'fas fa-question-circle',
        interactive: 'fas fa-mouse-pointer'
    };
    return <i className={`${iconMap[type]} mr-2 text-primary w-5 text-center`}></i>;
};

const QuizComponent: React.FC<{ quiz: QuizQuestion[] }> = ({ quiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const question = quiz[currentQuestionIndex];

    const handleAnswer = (option: string) => {
        if (showFeedback) return;
        setSelectedAnswer(option);
        const correct = option === question.correctAnswer;
        setIsCorrect(correct);
        if (correct) {
            setScore(prev => prev + 1);
            audioService.playSuccess();
        }
        setShowFeedback(true);
    };

    const handleNext = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (currentQuestionIndex < quiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizFinished(true);
            audioService.playWin();
        }
    };
    
    if (quizFinished) {
        return (
            <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground dark:text-slate-200 mb-4">¡Quiz Completado!</h3>
                <p className="text-lg text-muted-foreground dark:text-slate-400">Tu puntuación: <span className="font-bold text-primary">{score} de {quiz.length}</span></p>
                <p className="text-4xl mt-4">🎉</p>
            </div>
        )
    }

    return (
        <div>
            <h4 className="text-xl font-bold text-foreground dark:text-slate-200 mb-4">{question.question}</h4>
            <div className="space-y-3">
                {question.options.map(option => {
                    const isSelected = selectedAnswer === option;
                    let buttonClass = 'bg-muted dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-foreground dark:text-slate-200';
                    if (showFeedback && isSelected) {
                        buttonClass = isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
                    } else if (showFeedback && option === question.correctAnswer) {
                        buttonClass = 'bg-green-500 text-white';
                    }
                    
                    return (
                        <button key={option} onClick={() => handleAnswer(option)} disabled={showFeedback}
                                className={`w-full text-left p-4 rounded-lg font-semibold transition-colors ${buttonClass}`}>
                            {option}
                        </button>
                    )
                })}
            </div>
            {showFeedback && (
                <div className="text-center mt-6">
                    <p className={`font-bold text-lg ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <button onClick={handleNext} className="mt-4 bg-primary text-primary-foreground font-bold py-2 px-6 rounded-full">
                        {currentQuestionIndex < quiz.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                    </button>
                </div>
            )}
        </div>
    )
}

const LessonViewerModal: React.FC<{ lesson: Lesson | null; onClose: () => void }> = ({ lesson, onClose }) => {
    if (!lesson) return null;

    const renderContent = () => {
        switch(lesson.type) {
            case 'video':
                return (
                     <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${lesson.videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                );
            case 'reading':
                return (
                     <div className="prose prose-lg dark:prose-invert max-h-[60vh] overflow-y-auto p-4 bg-muted dark:bg-slate-900 rounded-lg">
                        <p className="whitespace-pre-wrap">{lesson.content}</p>
                    </div>
                )
            case 'quiz':
                return lesson.quiz ? <QuizComponent quiz={lesson.quiz} /> : <p>Quiz no disponible.</p>
            default:
                return <p>Contenido interactivo próximamente.</p>
        }
    }

    return (
        <Modal isOpen={!!lesson} onClose={onClose} title={lesson.title}>
            {renderContent()}
        </Modal>
    )
}

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const { isPremium, openTutor } = useAuth();
    const course = courses.find(c => c.id === courseId);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (course && course.isPremium && !isPremium) {
            navigate('/subscription');
        }
    }, [course, isPremium, navigate]);

    if (!course) {
        return <div className="text-center py-20">Curso no encontrado.</div>;
    }

    if (course.isPremium && !isPremium) {
        return null;
    }

    const handleLessonClick = (lesson: Lesson) => {
        audioService.playClick();
        setSelectedLesson(lesson);
    };

    return (
        <div className="bg-background dark:bg-[#0F172A]">
             <LessonViewerModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-card dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-border dark:border-slate-700/50">
                    <div className="p-6 md:p-10 bg-muted dark:bg-gradient-to-br from-slate-900 to-slate-800">
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                            <div className="lg:col-span-1">
                                <img src={course.image} alt={course.title} className="w-full h-auto object-cover rounded-xl shadow-lg" />
                            </div>
                            <div className="lg:col-span-2">
                                <h1 className="text-4xl font-bold text-foreground dark:text-slate-200 mb-2">{course.title}</h1>
                                <p className="text-lg text-muted-foreground dark:text-slate-400 mb-4">{course.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <span className="bg-card dark:bg-slate-700 font-semibold px-3 py-1 rounded-full text-foreground dark:text-slate-300">Duración: {course.duration}</span>
                                    <span className="bg-card dark:bg-slate-700 font-semibold px-3 py-1 rounded-full text-foreground dark:text-slate-300">Nivel: {course.level}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 md:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Left Column - Curriculum */}
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl font-bold text-foreground dark:text-slate-200 mb-6">Plan de Estudios</h2>
                                {course.content.modules.map((module, index) => (
                                    <details key={index} className="mb-4 group" open={index === 0}>
                                        <summary className="bg-muted dark:bg-slate-900 p-4 rounded-lg cursor-pointer flex justify-between items-center font-bold text-foreground dark:text-slate-200 transition hover:bg-slate-200 dark:hover:bg-slate-700">
                                            {module.title}
                                            <i className="fas fa-chevron-down transform group-open:rotate-180 transition-transform"></i>
                                        </summary>
                                        <div className="p-4 border border-border dark:border-slate-700 border-t-0 rounded-b-lg">
                                            <p className="text-muted-foreground dark:text-slate-400 mb-4">{module.description}</p>
                                            {module.lessons.length > 0 ? (
                                                <ul className="space-y-3">
                                                    {module.lessons.map((lesson, lessonIndex) => (
                                                        <li key={lessonIndex}>
                                                            <button onClick={() => handleLessonClick(lesson)} className="w-full flex items-center gap-4 p-3 bg-card dark:bg-[#0F172A] rounded-lg shadow-sm border border-border dark:border-slate-700 hover:bg-muted dark:hover:bg-slate-900/50 transition-colors text-left">
                                                                {lesson.image && <img src={lesson.image} alt={lesson.title} className="w-20 h-16 object-cover rounded-md flex-shrink-0" />}
                                                                <div className="flex-grow">
                                                                    <div className="flex items-center">
                                                                        <LessonTypeIcon type={lesson.type} />
                                                                        <span className="font-semibold text-foreground dark:text-slate-200">{lesson.title}</span>
                                                                    </div>
                                                                    <span className="text-sm text-muted-foreground dark:text-slate-400 ml-7">{lesson.duration} min</span>
                                                                </div>
                                                                <i className="fas fa-play-circle text-2xl text-primary/50 group-hover:text-primary"></i>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-muted-foreground dark:text-slate-400 italic">Lecciones próximamente...</p>
                                            )}
                                        </div>
                                    </details>
                                ))}
                            </div>

                            {/* Right Column - Teacher & Learnings */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="bg-muted dark:bg-slate-900 p-6 rounded-xl border-l-4 border-primary">
                                    <h3 className="text-2xl font-bold text-foreground dark:text-slate-200 mb-4">Lo que aprenderás</h3>
                                    <ul className="space-y-3 text-muted-foreground dark:text-slate-400">
                                        {course.content.learn.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-primary font-bold mr-3">✓</span>
                                                <span className="text-foreground dark:text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-6 bg-muted dark:bg-slate-900 rounded-xl flex flex-col items-center text-center">
                                    <img src={course.teacher.image} alt={course.teacher.name} className="w-24 h-24 rounded-full object-cover border-4 border-primary mb-4" />
                                    <h3 className="text-xl font-bold text-foreground dark:text-slate-200">{course.teacher.name}</h3>
                                    <p className="text-muted-foreground dark:text-slate-400 text-sm">{course.teacher.bio}</p>
                                </div>
                            </div>
                        </div>
                         <div className="text-center mt-12">
                             <Link to="/courses" className="bg-secondary text-secondary-foreground font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105 shadow-lg">
                                Volver a Cursos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
             <button onClick={openTutor} className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-secondary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 animate-bounce">
                <i className="fas fa-robot text-2xl"></i>
            </button>
        </div>
    );
};

export default CourseDetail;
