import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../hooks/useAuth';
import Modal from './Modal';
import AITutor from './AITutor';

const Layout: React.FC = () => {
  const { isTutorOpen, closeTutor } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark:bg-[#0F172A] dark:text-[#E2E8F0]">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Modal isOpen={isTutorOpen} onClose={closeTutor} title="AI Tutor">
          <AITutor />
      </Modal>
    </div>
  );
};

export default Layout;