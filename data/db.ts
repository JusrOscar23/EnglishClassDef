import { Course, Game, Video, CourseLevel, Book } from '../types';

export const courses: Course[] = [
  {
    id: 'ingles-para-principiantes',
    title: 'Inglés para Principiantes',
    level: CourseLevel.Basic,
    duration: '8 semanas',
    description: 'Este curso está diseñado para quienes comienzan desde cero. Aprenderás vocabulario esencial, gramática básica y habilidades de conversación para situaciones cotidianas.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    isPremium: false,
    content: {
      learn: [
        'Saludos y presentaciones básicas en inglés',
        'Vocabulario esencial para situaciones cotidianas (familia, trabajo, comida, etc.)',
        'Formar oraciones simples en presente (verbos to be y present simple)',
        'Pronunciación correcta de sonidos básicos del inglés',
        'Hacer preguntas y responder adecuadamente en conversaciones simples',
      ],
      modules: [
        { 
          title: 'Módulo 1: Conociéndonos', 
          description: 'Saludos, despedidas, presentaciones personales y el verbo "to be".',
          lessons: [
            { title: 'Video: Primeros Saludos', type: 'video', duration: 10, image: 'https://images.unsplash.com/photo-1556742059-43a7595a4a9c?q=80&w=2070&auto=format&fit=crop', videoId: 'mIyBALT__k' },
            { title: 'Lectura: El Verbo "To Be"', type: 'reading', duration: 15, content: 'El verbo "to be" es uno de los más importantes en inglés. Significa "ser" o "estar". Sus formas en presente son AM, IS, y ARE. \n\n- I am (Yo soy/estoy)\n- You are (Tú eres/estás)\n- He/She/It is (Él/Ella/Eso es/está)\n- We are (Nosotros somos/estamos)\n- They are (Ellos son/están)\n\nSe usa para describir, identificar y localizar.' },
            { title: 'Quiz: Saludos y "To Be"', type: 'quiz', duration: 10, quiz: [
                { question: '¿Cómo se dice "Yo soy un estudiante"?', options: ['I is a student', 'I are a student', 'I am a student'], correctAnswer: 'I am a student' },
                { question: 'Completa: "____ you from Spain?"', options: ['Is', 'Are', 'Am'], correctAnswer: 'Are' },
                { question: '¿Cuál es la forma correcta para "él"?', options: ['He are', 'He is', 'He am'], correctAnswer: 'He is' }
            ]},
          ]
        },
        { 
          title: 'Módulo 2: Mi vida diaria', 
          description: 'Rutinas, actividades comunes y presente simple.',
          lessons: [
            { title: 'Video: Verbos de Rutina', type: 'video', duration: 12, image: 'https://images.unsplash.com/photo-1486308510493-aa6483363744?q=80&w=2070&auto=format&fit=crop', videoId: 'eXy_h48K_3U' },
            { title: 'Lectura: El Presente Simple', type: 'reading', duration: 18, content: 'El Presente Simple se usa para hablar de hábitos, rutinas y hechos generales. Para la tercera persona (he, she, it), generalmente se añade una "-s" al final del verbo. Por ejemplo: "I work" pero "He works". Para preguntas y negaciones, se usan los auxiliares DO y DOES. \n\n- Do you work here? (¿Trabajas aquí?)\n- She does not work here. (Ella no trabaja aquí).' },
            { title: 'Quiz: Presente Simple', type: 'quiz', duration: 10, quiz: [
                 { question: 'Elige la forma correcta: "She ____ coffee every morning."', options: ['drink', 'drinks', 'drinking'], correctAnswer: 'drinks' },
                 { question: '¿Cuál es la pregunta correcta?', options: ['He does live here?', 'Does he live here?', 'Do he live here?'], correctAnswer: 'Does he live here?' }
            ]},
          ]
        },
        { 
            title: 'Módulo 3: Mi familia y amigos', 
            description: 'Vocabulario sobre familia, descripciones físicas y adjetivos básicos.', 
            lessons: [
                 { title: 'Video: Miembros de la Familia', type: 'video', duration: 10, image: 'https://images.unsplash.com/photo-1557813136-18801708594d?q=80&w=2070&auto=format&fit=crop', videoId: 'RLa2S1PfI-k' },
                 { title: 'Lectura: Describiendo Personas', type: 'reading', duration: 15, content: 'Para describir personas, usamos adjetivos. Por ejemplo: "tall" (alto), "short" (bajo), "young" (joven), "old" (viejo). El adjetivo siempre va antes del sustantivo en inglés. Ejemplo: "a tall man" (un hombre alto), "a smart woman" (una mujer inteligente).' },
                 { title: 'Quiz: Familia y Adjetivos', type: 'quiz', duration: 10, quiz: [
                    { question: '¿Cómo se dice "hermano" en inglés?', options: ['Sister', 'Mother', 'Brother'], correctAnswer: 'Brother' },
                    { question: 'Elige la oración correcta:', options: ['She is a woman tall', 'She is a tall woman', 'She a tall woman is'], correctAnswer: 'She is a tall woman' }
                ]},
            ] 
        },
      ],
    },
    teacher: {
      name: 'Prof. Sarah Johnson',
      bio: 'Profesora certificada con 10 años de experiencia enseñando inglés a principiantes. Especializada en métodos interactivos y aprendizaje basado en juegos.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    },
  },
   {
    id: 'vocabulario-esencial',
    title: 'Vocabulario Esencial Básico',
    level: CourseLevel.Basic,
    duration: '6 semanas',
    description: 'Aprende las 500 palabras más comunes en inglés a través de actividades interactivas y juegos de memoria.',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2070&auto=format&fit=crop',
    isPremium: true,
    content: { 
        learn: [
            'Las 500 palabras más frecuentes en inglés.',
            'Uso de flashcards interactivas para memorización.',
            'Técnicas de repetición espaciada.',
            'Aplicación del vocabulario en oraciones.',
        ], 
        modules: [
            { title: 'Módulo 1: Personas y Familia', description: 'Palabras sobre personas, familia y relaciones.', lessons: [{ title: 'Lección 1', type: 'interactive', duration: 30 }] },
            { title: 'Módulo 2: Comida y Bebida', description: 'Vocabulario para el supermercado y restaurante.', lessons: [{ title: 'Lección 2', type: 'interactive', duration: 30 }] },
        ] 
    },
    teacher: { name: 'Prof. David Chen', bio: 'Lingüista especializado en adquisición de vocabulario.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
  },
  {
    id: 'conversacion-intermedia',
    title: 'Conversación Intermedia',
    level: CourseLevel.Intermediate,
    duration: '10 semanas',
    description: 'Mejora tu fluidez con diálogos reales, expresiones comunes y práctica de pronunciación con hablantes nativos.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
    isPremium: true,
    content: { 
        learn: [
            'Participar en debates y discusiones.',
            'Uso de "phrasal verbs" comunes.',
            'Entender diferentes acentos.',
            'Mejorar la entonación y el ritmo.',
        ], 
        modules: [
             { title: 'Módulo 1: Rompiendo el Hielo', description: 'Iniciar y mantener conversaciones casuales.', lessons: [{ title: 'Práctica de Diálogo', type: 'video', duration: 45, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=2070&auto=format&fit=crop', videoId: 'zhYsl5-zu3M' }] },
             { title: 'Módulo 2: Opiniones y Debates', description: 'Expresar tu punto de vista de forma educada.', lessons: [{ title: 'Simulación de Debate', type: 'interactive', duration: 45 }] },
        ] 
    },
    teacher: { name: 'Prof. Maria Rodriguez', bio: 'Coach de conversación con enfoque en la fluidez y confianza.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
  },
  {
    id: 'gramatica-avanzada',
    title: 'Gramática Avanzada',
    level: CourseLevel.Intermediate,
    duration: '8 semanas',
    description: 'Profundiza en tiempos verbales, condicionales y voz pasiva para expresarte con mayor precisión.',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop',
    isPremium: true,
    content: { 
        learn: [
            'Dominio de los tiempos perfectos y continuos.',
            'Uso correcto de todos los tipos de condicionales.',
            'Oraciones complejas con cláusulas relativas.',
            'Estilo indirecto (Reported Speech).',
        ], 
        modules: [
             { title: 'Módulo 1: Tiempos Verbales Perfectos', description: 'Revisión y práctica avanzada.', lessons: [{ title: 'Ejercicios Avanzados', type: 'quiz', duration: 40, quiz: [
                 { question: 'Completa: "By the time I arrived, she ___."', options: ['had left', 'has left', 'left'], correctAnswer: 'had left' },
                 { question: 'Elige la opción correcta: "I ___ here for three years."', options: ['have been living', 'am living', 'was living'], correctAnswer: 'have been living' }
             ] }] },
             { title: 'Módulo 2: Condicionales Mixtos', description: 'Explorando situaciones hipotéticas complexas.', lessons: [{ title: 'Creación de Escenarios', type: 'interactive', duration: 40 }] },
        ] 
    },
    teacher: { name: 'Prof. Emily White', bio: 'Experta en gramática inglesa con publicaciones en revistas académicas.', image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1974&auto=format&fit=crop' },
  },
  {
    id: 'negocios-en-ingles',
    title: 'Negocios en Inglés',
    level: CourseLevel.Advanced,
    duration: '12 semanas',
    description: 'Domina reuniones, presentaciones, negociaciones y comunicación profesional en entornos corporativos.',
    image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2070&auto=format&fit=crop',
    isPremium: true,
    content: { 
        learn: [
            'Vocabulario clave para finanzas, marketing y gestión.',
            'Redacción de correos electrónicos profesionales.',
            'Técnicas de negociación efectivas.',
            'Cómo liderar una reunión en inglés.',
        ], 
        modules: [
             { title: 'Módulo 1: Comunicación por Email', description: 'Etiqueta y formalidad en la escritura.', lessons: [{ title: 'Redacción de Emails', type: 'interactive', duration: 60 }] },
             { title: 'Módulo 2: Simulacro de Negociación', description: 'Practica escenarios de negocios realistas.', lessons: [{ title: 'Juego de Roles', type: 'video', duration: 60, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', videoId: 'd_y-uek8uDE' }] },
        ] 
    },
    teacher: { name: 'Prof. John Smith', bio: 'Consultor de negocios internacional con 20 años de experiencia.', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop' },
  },
   {
    id: 'composicion-avanzada',
    title: 'Composición y Estilo Avanzado',
    level: CourseLevel.Advanced,
    duration: '10 semanas',
    description: 'Perfecciona tu escritura en inglés, desde ensayos académicos hasta escritura creativa, con un enfoque en el estilo y la cohesión.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
    isPremium: true,
    content: { 
        learn: [
            'Estructura de ensayos argumentativos y expositivos.',
            'Uso de lenguaje figurado y recursos estilísticos.',
            'Técnicas para mejorar la claridad y el flujo.',
            'Edición y corrección de textos a nivel profesional.',
        ], 
        modules: [
             { title: 'Módulo 1: El Ensayo Argumentativo', description: 'Aprende a construir argumentos sólidos y persuasivos.', lessons: [{ title: 'Taller de Escritura', type: 'interactive', duration: 60 }] },
             { title: 'Módulo 2: Escritura Creativa', description: 'Explora la narración y la descripción para contar historias.', lessons: [{ title: 'Crea tu Historia', type: 'interactive', duration: 60 }] },
        ] 
    },
    teacher: { name: 'Prof. Diana Wells', bio: 'Editora y autora publicada con un doctorado en Literatura Inglesa.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop' },
  },
  {
    id: 'preparacion-toefl-ielts',
    title: 'Preparación TOEFL/IELTS',
    level: CourseLevel.Advanced,
    duration: '16 semanas',
    description: 'Curso intensivo con estrategias, práctica y simulacros para obtener los mejores resultados en exámenes oficiales.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop',
    isPremium: true,
    content: { learn: [], modules: [] },
    teacher: { name: 'Prof. Laura Evans', bio: 'Examinadora oficial de IELTS y TOEFL con más de 15 años de experiencia.', image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop' },
  },
];

export const games: Game[] = [
    { 
        id: 'memory-game', 
        title: 'Juego de Memoria',
        description: 'Encuentra las parejas de palabras en inglés y español para mejorar tu vocabulario de una manera divertida.',
        image: 'https://images.unsplash.com/photo-1581345837502-71a082c95764?q=80&w=2070&auto=format&fit=crop',
        path: '/games/memory'
    },
    {
        id: 'wordle-game',
        title: 'Wordle',
        description: 'Adivina la palabra oculta de 5 letras en 6 intentos. Un desafío diario para tu mente y tu vocabulario.',
        image: 'https://images.unsplash.com/photo-1621319237624-9a572a5f784a?q=80&w=2070&auto=format&fit=crop',
        path: '/games/wordle'
    },
    {
        id: 'hangman-game',
        title: 'El Ahorcado',
        description: 'El clásico juego de adivinar la palabra antes de que se complete la figura. Ideal para practicar el abecedario.',
        image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop',
        path: '/games/hangman'
    },
    {
        id: 'sentence-scramble',
        title: 'Sentence Scramble',
        description: 'Ordena las palabras para formar oraciones correctas en inglés. Perfecto para practicar gramática y estructura.',
        image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
        path: '/games/scramble'
    }
];

export const dailyVideos: Video[] = [
    { id: 'rsd2x_s5H2o', title: 'Aprende los Verbos Modales', channel: 'English with Lucy' , type: 'youtube'},
    { id: 'mSbeCHO_G9c', title: '10 Phrasal Verbs Comunes', channel: 'Learn English with Bob the Canadian', type: 'youtube' },
    { id: '2bW3l_G6h74', title: 'Practica tu Listening', channel: 'Rachel\'s English', type: 'youtube' },
    { id: '9izB82xnd3o', title: 'Mejora tu Pronunciación', channel: 'mmmEnglish', type: 'youtube' },
];

export const books: Book[] = [
    {
        id: 'english-grammar-in-use',
        title: 'English Grammar in Use',
        author: 'Raymond Murphy',
        coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=1912&auto=format&fit=crop',
        description: 'Un libro de referencia y práctica de auto-estudio para estudiantes de nivel intermedio.',
        level: [CourseLevel.Intermediate],
        isPremium: true
    },
    {
        id: 'the-little-prince',
        title: 'The Little Prince',
        author: 'Antoine de Saint-Exupéry',
        coverImage: 'https://images.unsplash.com/photo-1621827911089-c44447013195?q=80&w=1964&auto=format&fit=crop',
        description: 'Una novela poética que explora temas de soledad, amistad, amor y pérdida.',
        level: [CourseLevel.Intermediate, CourseLevel.Advanced],
        isPremium: true
    },
     {
        id: 'to-kill-a-mockingbird',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
        description: 'Un clásico de la literatura moderna americana que aborda temas serios con calidez y humor.',
        level: [CourseLevel.Advanced],
        isPremium: true
    },
    {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        author: 'James Clear',
        coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop',
        description: 'Una guía práctica para construir buenos hábitos y romper los malos.',
        level: [CourseLevel.Advanced],
        isPremium: true
    }
];

export const carouselImages = [
    { src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop', alt: 'Conversational class', text: 'Clases de Conversación Dinámicas' },
    { src: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop', alt: 'Writing workshop', text: 'Talleres de Escritura Creativa' },
    { src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop', alt: 'Business English course', text: 'Inglés de Negocios para Profesionales' },
];
