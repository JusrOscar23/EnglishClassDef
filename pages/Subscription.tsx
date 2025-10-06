import React, { useState } from 'react';
import Modal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getMotivationalMessage } from '../services/geminiService';
import { audioService } from '../services/audioService';


const Checkmark: React.FC = () => (
    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const SubscriptionPlan: React.FC<{
    plan: { title: string; price: string; period: string; features: string[]; popular?: boolean };
    onSelect: () => void;
}> = ({ plan, onSelect }) => {
    return (
        <div className={`relative bg-card dark:bg-slate-800 rounded-2xl shadow-lg p-8 border-2 transition-transform hover:-translate-y-2 ${plan.popular ? 'border-primary shadow-cyan-500/10' : 'border-border dark:border-slate-700'}`}>
            {plan.popular && <div className="absolute top-0 right-8 -mt-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">MÁS POPULAR</div>}
            <h3 className="text-3xl font-bold text-card-foreground dark:text-slate-200 mb-2">{plan.title}</h3>
            <div className="text-5xl font-extrabold text-foreground dark:text-white my-4">{plan.price}</div>
            <p className="text-muted-foreground dark:text-slate-400 mb-8">{plan.period}</p>
            <ul className="text-left space-y-3 mb-8 text-muted-foreground dark:text-slate-400">
                {plan.features.map(feature => (
                    <li key={feature} className="flex items-center">
                        <Checkmark /> {feature}
                    </li>
                ))}
            </ul>
            <button onClick={() => { audioService.playClick(); onSelect();}} className={`w-full font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105 shadow-lg ${plan.popular ? 'bg-primary text-primary-foreground hover:shadow-cyan-500/30' : 'bg-muted dark:bg-slate-700 text-foreground dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                Seleccionar Plan
            </button>
        </div>
    );
};

const PaymentForm: React.FC<{ onPaymentSuccess: () => void }> = ({ onPaymentSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        audioService.playClick();
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            audioService.playWin();
            onPaymentSuccess();
        }, 2000);
    }

    const inputClass = "w-full p-3 bg-muted dark:bg-slate-700 border-2 border-border dark:border-slate-600 rounded-lg text-foreground dark:text-slate-200 focus:border-primary focus:outline-none focus:ring-0";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4">
                <p className="font-bold text-primary">MODO DE DEMOSTRACIÓN</p>
                <p className="text-sm text-muted-foreground dark:text-slate-400">Este es un formulario de pago simulado. No se realizará ningún cargo real.</p>
            </div>
            <div>
                <label className="font-semibold text-muted-foreground dark:text-slate-400 block mb-2">Número de Tarjeta</label>
                <input type="text" className={inputClass} placeholder="**** **** **** 1234" required />
            </div>
            <div>
                <label className="font-semibold text-muted-foreground dark:text-slate-400 block mb-2">Nombre en la Tarjeta</label>
                <input type="text" className={inputClass} placeholder="John Doe" required />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="font-semibold text-muted-foreground dark:text-slate-400 block mb-2">Expiración (MM/AA)</label>
                    <input type="text" className={inputClass} placeholder="12/28" required />
                </div>
                <div className="flex-1">
                    <label className="font-semibold text-muted-foreground dark:text-slate-400 block mb-2">CVV</label>
                    <input type="text" className={inputClass} placeholder="123" required />
                </div>
            </div>
            <button type="submit" disabled={isProcessing} className="w-full mt-6 bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105 shadow-lg disabled:bg-slate-600">
                {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
            </button>
        </form>
    )
}

const BenefitCard: React.FC<{ image: string; title: string; children: React.ReactNode }> = ({ image, title, children }) => (
    <div className="bg-card dark:bg-slate-800 rounded-2xl overflow-hidden border border-border dark:border-slate-700/50">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold text-foreground dark:text-slate-200 mb-2">{title}</h3>
            <p className="text-muted-foreground dark:text-slate-400">{children}</p>
        </div>
    </div>
);

const Subscription: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [goal, setGoal] = useState('');
    const [motivation, setMotivation] = useState('Tu motivación es el primer paso. ¡Cuéntanos la tuya para que podamos ayudarte a alcanzarla!');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const plans = [
        { title: 'Básico', price: 'Gratis', period: 'Acceso limitado', features: ['Cursos para principiantes', 'Acceso a juegos seleccionados'] },
        { title: 'Pro', price: '$70.000', period: 'COP / mes', features: ['Acceso ilimitado a todos los cursos', 'Todos los juegos y videos desbloqueados', 'Material de estudio exclusivo', 'Soporte prioritario'], popular: true },
        { title: 'Premium', price: '$100.000', period: 'COP / mes', features: ['Todos los beneficios de Pro', 'Nuevas lecciones cada semana', 'Sesiones de conversación grupales'] },
    ];

    const handlePaymentSuccess = () => {
        login();
        setIsModalOpen(false);
        alert('¡Suscripción exitosa! Ahora tienes acceso a todo el contenido premium.');
        navigate('/courses');
    };

    const handleGenerateMotivation = async () => {
        audioService.playClick();
        if (goal.trim().length < 10) {
            setMotivation('Por favor, describe tu objetivo con un poco más de detalle.');
            return;
        }
        setIsLoading(true);
        setMotivation('Generando tu mensaje... ✨');
        const message = await getMotivationalMessage(goal);
        setMotivation(message);
        setIsLoading(false);
    };

    return (
        <div className="bg-background dark:bg-[#0F172A]">
             <section className="relative text-center py-24 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Planes Flexibles para Ti</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">Elige el plan que mejor se adapte a tus metas y desbloquea tu potencial en inglés.</p>
                </div>
            </section>

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            plan.title === 'Básico' ? (
                                <div key={index} className="bg-card dark:bg-slate-800 rounded-2xl shadow-lg p-8 border-2 border-border dark:border-slate-700">
                                    <h3 className="text-3xl font-bold text-card-foreground dark:text-slate-200 mb-2">{plan.title}</h3>
                                    <div className="text-5xl font-extrabold text-foreground dark:text-white my-4">{plan.price}</div>
                                    <p className="text-muted-foreground dark:text-slate-400 mb-8">{plan.period}</p>
                                    <ul className="text-left space-y-3 mb-8 text-muted-foreground dark:text-slate-400">
                                        {plan.features.map(feature => (
                                            <li key={feature} className="flex items-center"><Checkmark /> {feature}</li>
                                        ))}
                                    </ul>
                                    <button disabled className="w-full cursor-default bg-muted dark:bg-slate-900 text-muted-foreground dark:text-slate-500 font-bold py-3 px-8 rounded-full text-lg">
                                        Tu Plan Actual
                                    </button>
                                </div>
                            ) : (
                                <SubscriptionPlan key={index} plan={plan} onSelect={() => setIsModalOpen(true)} />
                            )
                        ))}
                    </div>
                    
                    <div className="max-w-3xl mx-auto text-center mt-16 text-sm text-muted-foreground dark:text-slate-400">
                        <p>Tu suscripción nos permite mantener la plataforma, desarrollar contenido nuevo constantemente y asegurar que tengas la mejor experiencia de aprendizaje posible. ¡Gracias por tu apoyo!</p>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-foreground dark:text-slate-200 mb-12">Beneficios Premium</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <BenefitCard image="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?q=80&w=2070&auto=format&fit=crop" title="Acceso Total">
                                Desbloquea todos los cursos, desde principiante hasta avanzado, y aprende a tu propio ritmo sin limitaciones.
                           </BenefitCard>
                           <BenefitCard image="https://images.unsplash.com/photo-1505664194779-8beace7a2044?q=80&w=2070&auto=format&fit=crop" title="Contenido Exclusivo">
                                Accede a libros didácticos, videos especiales y nuevos juegos que se añaden constantemente solo para miembros premium.
                           </BenefitCard>
                            <BenefitCard image="https://images.unsplash.com/photo-1677756119517-756a188d2d9b?q=80&w=2070&auto=format&fit=crop" title="Tutor IA Ilimitado">
                                Utiliza nuestro tutor de IA siempre que lo necesites para resolver dudas, practicar y perfeccionar tu inglés.
                           </BenefitCard>
                        </div>
                    </div>
                    
                    <div className="max-w-3xl mx-auto bg-card dark:bg-slate-800 p-8 rounded-2xl mt-20 text-center border-2 border-border dark:border-slate-700">
                        <h4 className="text-2xl font-bold text-primary mb-4">✨ ¿Por qué quieres aprender inglés?</h4>
                        <p className="text-muted-foreground dark:text-slate-400 mb-4">Cuéntanos tus metas y nuestra IA te dará un mensaje de motivación personalizado.</p>
                        <textarea value={goal} onChange={(e) => setGoal(e.target.value)}
                            className="w-full h-24 p-3 bg-muted dark:bg-slate-900 border-2 border-border dark:border-slate-600 text-foreground dark:text-slate-200 rounded-lg resize-none focus:border-primary focus:outline-none transition"
                            placeholder="Ej: Quiero aprender inglés para viajar por el mundo y conocer gente nueva."
                        ></textarea>
                        <button onClick={handleGenerateMotivation} disabled={isLoading}
                            className="mt-4 bg-primary text-primary-foreground font-bold py-2 px-6 rounded-full transition-transform hover:scale-105 disabled:opacity-50">
                            {isLoading ? 'Generando...' : 'Generar Mensaje'}
                        </button>
                        <div className="mt-6 bg-muted dark:bg-slate-900/50 p-4 rounded-lg shadow-inner min-h-[50px]">
                            <p className="text-foreground dark:text-slate-200 italic">{motivation}</p>
                        </div>
                    </div>

                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Completa tu Suscripción">
                <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
            </Modal>
        </div>
    );
};

export default Subscription;