import React, { useState, useRef, useEffect } from 'react';
import { getAITutorResponse } from '../services/geminiService';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const AITutor: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: '¡Hola! Soy tu tutor de IA. ¿En qué puedo ayudarte hoy con tu inglés?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await getAITutorResponse(input);
            const aiMessage: Message = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { sender: 'ai', text: 'Lo siento, algo salió mal. Inténtalo de nuevo.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };
    
    return (
        <div className="flex flex-col h-[60vh]">
            <div className="flex-grow overflow-y-auto p-4 bg-muted dark:bg-[#0F172A] rounded-lg space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0"><i className="fas fa-robot text-sm"></i></div>}
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card dark:bg-slate-700 text-card-foreground dark:text-slate-200 rounded-bl-none shadow-sm'}`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0"><i className="fas fa-robot text-sm"></i></div>
                        <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-card dark:bg-slate-700 text-card-foreground dark:text-slate-200 rounded-bl-none shadow-sm">
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 bg-muted-foreground dark:text-slate-400 rounded-full animate-bounce delay-75"></div>
                               <div className="w-2 h-2 bg-muted-foreground dark:text-slate-400 rounded-full animate-bounce delay-200"></div>
                               <div className="w-2 h-2 bg-muted-foreground dark:text-slate-400 rounded-full animate-bounce delay-300"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu pregunta..."
                    className="flex-grow p-3 bg-muted dark:bg-slate-700 border-2 border-border dark:border-slate-600 text-foreground dark:text-slate-200 rounded-full focus:border-primary focus:outline-none"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || input.trim() === ''}
                    className="bg-primary text-primary-foreground font-bold w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};

export default AITutor;