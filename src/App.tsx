import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactModal from './components/ContactModal';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const handleNavClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLiveProjectClick = (projectName: string) => {
    setToastText(`Direct preview demo for "${projectName}" requested. Loading asset demo...`);
    setTimeout(() => {
      setToastText(null);
    }, 4500);
  };

  return (
    <div 
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans antialiased selection:bg-[#B600A8]/30 selection:text-white w-full"
      style={{ overflowX: 'clip' }}
    >
      <main className="w-full relative" style={{ overflowX: 'clip' }}>
        {/* SECTION 1: HERO */}
        <HeroSection 
          onContactClick={() => setIsContactOpen(true)} 
          onNavClick={handleNavClick} 
        />

        {/* SECTION 2: MARQUEE */}
        <MarqueeSection />

        {/* SECTION 3: ABOUT */}
        <AboutSection onContactClick={() => setIsContactOpen(true)} />

        {/* SECTION 4: SERVICES */}
        <ServicesSection />

        {/* SECTION 5: PROJECTS */}
        <ProjectsSection onLiveClick={handleLiveProjectClick} />
      </main>

      {/* Floating Interactive Premium Toast notification */}
      <AnimatePresence>
        {toastText && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#111111] border border-white/10 text-white rounded-full px-6 py-3.5 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#B600A8] animate-ping" />
            <span className="opacity-90 flex items-center gap-1.5 font-light">
              <Info size={14} className="text-zinc-400" />
              {toastText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Contact Form Overlay */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
