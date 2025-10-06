

export enum CourseLevel {
  Basic = 'Básico',
  Intermediate = 'Intermedio',
  Advanced = 'Avanzado'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'interactive';
  duration: number; // in minutes
  image?: string;
  content?: string; // For reading type
  videoId?: string; // For video type
  quiz?: QuizQuestion[]; // For quiz type
}

export interface CourseModule {
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title:string;
  level: CourseLevel;
  duration: string;
  description: string;
  image: string;
  isPremium: boolean;
  content: {
    learn: string[];
    modules: CourseModule[];
  };
  teacher: {
    name: string;
    bio: string;
    image: string;
  };
}

export interface Game {
    id: string;
    title: string;
    description: string;
    image: string;
    path: string;
}

export interface Video {
    id: string;
    title: string;
    channel: string;
    type: 'youtube';
}

export interface LocalVideo {
    id: string;
    src: string;
    title: string;
    type: 'local';
}

export interface Book {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    description: string;
    level: CourseLevel[];
    isPremium: boolean;
}