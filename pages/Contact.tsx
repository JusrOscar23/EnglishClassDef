import React from 'react';

const teamMembers = [
  {
    name: 'Oscar Garcia',
    role: 'Coordinador Académico',
    email: 'ojgy06@gmail.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Alisson Juliana',
    role: 'Profesora de Conversación',
    email: 'alisonjuliana053@gmail.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
  },
  {
    name: 'Luis Arciniegas',
    role: 'Profesor de Gramática',
    email: 'luiseduardoarciniegas601@gmail.com',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Santiago Rada',
    role: 'Desarrollador de Contenidos',
    email: 'papaspepito94@gmail.com',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop',
  },
];

const Contact: React.FC = () => {
    return (
        <div className="bg-background dark:bg-[#0F172A]">
             <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587560699334-cc4262401233?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Estamos aquí para ayudarte</h1>
                    <p className="text-lg text-slate-300">Conecta con nuestro equipo y visita nuestras instalaciones.</p>
                </div>
            </section>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <h2 className="text-3xl font-bold text-center text-foreground dark:text-slate-200 mb-12">Conoce a Nuestro Equipo</h2>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {teamMembers.map(member => (
                        <div key={member.name} className="bg-card dark:bg-slate-800 text-center p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-border dark:border-slate-700 hover:border-primary/50">
                            <img className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary object-cover" src={member.image} alt={member.name} />
                            <h3 className="text-xl font-bold text-card-foreground dark:text-slate-200">{member.name}</h3>
                            <p className="text-muted-foreground dark:text-slate-400 mb-4">{member.role}</p>
                            <a href={`mailto:${member.email}`} className="text-primary font-semibold hover:text-primary/80 transition-colors text-sm">
                                {member.email}
                            </a>
                        </div>
                    ))}
                 </div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl font-bold text-foreground dark:text-slate-200 mb-4">Nuestra Ubicación</h3>
                        <p className="text-muted-foreground dark:text-slate-400 mb-4">Visítanos en nuestras instalaciones para conocer más sobre nuestros programas y metodología de enseñanza.</p>
                        <p className="text-muted-foreground dark:text-slate-400 mb-6">Estamos ubicados en un lugar estratégico con fácil acceso y todas las comodidades para nuestros estudiantes.</p>
                        <p className="font-semibold text-foreground dark:text-slate-200 mb-2"><strong>Horario de atención:</strong> Lunes a Viernes de 8:00 am a 6:00 pm</p>
                        <p className="font-semibold text-foreground dark:text-slate-200"><strong>Dirección:</strong> Calle 123 #45-67, Bogotá, Colombia</p>
                    </div>
                     <div className="h-96 rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-slate-700">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.840679720496!2d-74.0722336!3d4.6074903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a38f98829f%3A0x6e26715b74c2d3d3!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sus!4v1694200000000!5m2!1sen!2sus" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={false} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="dark:grayscale-[100%] dark:invert-[100%] dark:contrast-[100%]">
                        </iframe>
                    </div>
                 </div>
            </main>
        </div>
    );
};

export default Contact;