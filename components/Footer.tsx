import React from 'react';

const Footer: React.FC = () => {
    const socialLinks = [
        { icon: 'fab fa-instagram', href: 'https://instagram.com' },
        { icon: 'fab fa-twitter', href: 'https://twitter.com' },
        { icon: 'fab fa-youtube', href: 'https://youtube.com' },
        { icon: 'fab fa-tiktok', href: 'https://tiktok.com' },
    ];

    return (
        <footer className="bg-muted dark:bg-[#0F172A] border-t border-border dark:border-slate-700/50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center items-center mb-4 gap-3">
                     <span className="font-bold text-2xl text-foreground dark:text-slate-200 tracking-wider">English <span className="text-primary">Class</span></span>
                </div>
                <p className="mb-8 text-muted-foreground dark:text-slate-400">Learn English the smart way.</p>
                <div className="flex justify-center space-x-6 mb-8">
                    {socialLinks.map((link, index) => (
                        <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-slate-400 hover:text-primary transition-transform duration-300 hover:scale-125">
                            <i className={`${link.icon} text-2xl`}></i>
                        </a>
                    ))}
                </div>
                <p className="text-slate-500 dark:text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} English Class. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;