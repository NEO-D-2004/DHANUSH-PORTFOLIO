import React, { useEffect, useRef } from 'react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';
import Typewriter from './Typewriter';
import { Github, Linkedin } from 'lucide-react';

interface HeroSectionProps {
  onContactClick: () => void;
  onNavClick: (targetId: string) => void;
}

// Helper to interpolate between brand colors:
// stop 0: #B600A8 (182, 0, 168)
// stop 0.5: #7621B0 (118, 33, 176)
// stop 1.0: #BE4C00 (190, 76, 0)
function getShiftingColorComponents(t: number): { r: number; g: number; b: number; hex: number } {
  let r = 0, g = 0, b = 0;
  if (t < 0.5) {
    const ratio = t / 0.5;
    r = Math.round(182 + (118 - 182) * ratio);
    g = Math.round(0 + (33 - 0) * ratio);
    b = Math.round(168 + (176 - 168) * ratio);
  } else {
    const ratio = (t - 0.5) / 0.5;
    r = Math.round(118 + (190 - 118) * ratio);
    g = Math.round(33 + (76 - 33) * ratio);
    b = Math.round(176 + (0 - 176) * ratio);
  }
  const hex = (r << 16) | (g << 8) | b;
  return { r, g, b, hex };
}

export default function HeroSection({ onContactClick, onNavClick }: HeroSectionProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glowRef.current) {
      glowRef.current.style.setProperty('--mouse-x', `${x}px`);
      glowRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  useEffect(() => {
    const VANTA = (window as any).VANTA;
    let vantaEffect: any = null;
    let animationFrameId: number;

    if (vantaRef.current && VANTA && VANTA.GLOBE) {
      try {
        vantaEffect = VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x7621b0,
          size: 0.9,
          backgroundColor: 0x0c0c0c,
        });

        // Slow shifting color loop (duration: 8 seconds total)
        const duration = 8000;
        const startTime = Date.now();

        const updateColors = () => {
          const elapsed = Date.now() - startTime;
          const progress = (elapsed % duration) / duration;
          // Ping-pong back and forth (0 -> 1 -> 0)
          const t = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
          
          const { r, g, b, hex } = getShiftingColorComponents(t);

          // Update Vanta globe wireframe color
          if (vantaEffect && typeof vantaEffect.setOptions === 'function') {
            vantaEffect.setOptions({ color: hex });
          }

          // Update synced glow colors
          if (glowRef.current) {
            glowRef.current.style.setProperty('--glow-color-1', `rgba(${r}, ${g}, ${b}, 0.22)`);
            glowRef.current.style.setProperty('--glow-color-2', `rgba(${r}, ${g}, ${b}, 0.12)`);
          }

          animationFrameId = requestAnimationFrame(updateColors);
        };

        updateColors();
      } catch (error) {
        console.error('Failed to initialize Vanta.js Globe:', error);
      }
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const navLinks = [
    { name: 'About', target: 'about-section' },
    { name: 'Services', target: 'services-section' },
    { name: 'Projects', target: 'projects-section' },
    { name: 'Contact', target: 'contact-section' },
  ];

  return (
    <section 
      id="hero-section" 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]"
    >
      {/* Vanta.js Globe Background */}
      <div ref={vantaRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Interactive Mouse-Follow Glow */}
      <div 
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-40 transition-opacity duration-300 blur-[130px]"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--glow-color-1, rgba(182, 0, 168, 0.18)), var(--glow-color-2, rgba(118, 33, 176, 0.12)), transparent 85%)`
        }}
      />

      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="header" className="w-full z-30">
        <nav className="flex flex-col sm:flex-row justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8 gap-4 sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <div 
              onClick={() => onNavClick('hero-section')}
              className="font-bold text-xl tracking-wider uppercase text-[#D7E2EA] hover:text-[#B600A8] transition-colors duration-300 cursor-pointer select-none"
            >
              DHANUSH
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 border-l border-white/20 pl-4 sm:pl-6">
              <a 
                href="https://github.com/NEO-D-2004" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#D7E2EA]/60 hover:text-[#B600A8] hover:scale-110 transition-all duration-300"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/dhanush-2k4/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#D7E2EA]/60 hover:text-[#B600A8] hover:scale-110 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://wa.me/919342699299" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#D7E2EA]/60 hover:text-[#B600A8] hover:scale-110 transition-all duration-300"
                title="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.428 1.978 13.96 1.957 12 1.957c-5.444 0-9.873 4.38-9.877 9.808-.001 1.776.479 3.51 1.39 5.023l-.95 3.471 3.568-.928zm10.702-4.142c-.292-.146-1.727-.853-1.995-.951-.267-.099-.463-.146-.659.146-.195.292-.756.951-.927 1.146-.171.195-.341.219-.633.073-.292-.146-1.234-.454-2.35-1.448-.868-.772-1.455-1.725-1.625-2.018-.171-.293-.018-.452.129-.597.132-.131.292-.341.439-.512.146-.171.195-.292.292-.487.099-.195.05-.366-.025-.512-.075-.146-.659-1.586-.902-2.172-.237-.57-.478-.492-.659-.501-.17-.008-.366-.01-.561-.01-.195 0-.512.073-.78.366-.268.292-1.024.999-1.024 2.435 0 1.437 1.049 2.825 1.195 3.018.146.195 2.063 3.14 4.997 4.41.697.302 1.242.483 1.666.617.7.223 1.338.192 1.843.117.562-.083 1.727-.706 1.971-1.389.243-.684.243-1.269.171-1.389-.072-.12-.267-.219-.559-.365z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="flex gap-4 sm:gap-6 md:gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.target === 'contact-section') {
                    onContactClick();
                  } else {
                    onNavClick(link.target);
                  }
                }}
                className="text-sm md:text-lg lg:text-[1.4rem] text-[#D7E2EA] hover:text-[#B600A8] font-medium uppercase tracking-wider transition-colors duration-300 cursor-pointer bg-transparent border-none outline-none"
              >
                {link.name}
              </button>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Hero Heading Container */}
      <div className="flex-grow flex items-center justify-start px-6 md:px-10 z-20 mt-6 sm:mt-4 md:-mt-5">
        <div className="w-full flex flex-col items-start">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[11.5vw] sm:text-[11.7vw] md:text-[11.9vw] lg:text-[12.4vw] select-none opacity-90 text-left">
              Hi, i&apos;m dhanush
            </h1>
          </FadeIn>

          <FadeIn delay={0.25} y={30} className="w-full">
            <div className="text-left mt-3 sm:mt-4 md:mt-5 font-bold uppercase tracking-wider text-white" style={{ fontSize: 'clamp(1rem, 2.5vw, 3rem)' }}>
              <span className="text-[#D7E2EA]/60 font-light mr-2 select-none">&gt;</span>
              <span className="border-r-4 border-[#B600A8] pr-2 animate-pulse" style={{ animationDuration: '0.8s' }}>
                <Typewriter strings={['UI/UX Designing', 'FrontEnd Developer','Web Development','Graphic Designing']} />
              </span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            Building the future with code, AI, and a passion for solving real-world problems.
          </p>
        </FadeIn>

        {/* Center-aligned Scroll Down Indicator */}
        <FadeIn delay={0.6} y={20} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button 
            onClick={() => onNavClick('about-section')}
            className="flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 bg-transparent border-none outline-none"
          >
            <div className="w-[22px] h-[36px] border-2 border-[#D7E2EA]/60 rounded-full flex justify-center p-1">
              <div className="w-[3px] h-[6px] bg-[#D7E2EA]/60 rounded-full animate-bounce" />
            </div>
            <span className="text-[8px] tracking-widest uppercase font-light text-[#D7E2EA]/60 select-none">Scroll</span>
          </button>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton id="hero-btn-contact" onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
}
