import React, { useEffect, useRef } from 'react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';

interface HeroSectionProps {
  onContactClick: () => void;
  onNavClick: (targetId: string) => void;
}

export default function HeroSection({ onContactClick, onNavClick }: HeroSectionProps) {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const VANTA = (window as any).VANTA;
    let vantaEffect: any = null;

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
          color: 0xffffff,
          size: 1.0,
          backgroundColor: 0x0c0c0c,
        });
      } catch (error) {
        console.error('Failed to initialize Vanta.js Globe:', error);
      }
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
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
    <section id="hero-section" className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* Vanta.js Globe Background */}
      <div ref={vantaRef} className="absolute inset-0 w-full h-full z-0" />
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="header" className="w-full z-30">
        <nav className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8">
          <div className="font-bold text-xl tracking-wider uppercase text-[#D7E2EA]">
            Dhanush
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
                className="text-sm md:text-lg lg:text-[1.4rem] text-[#D7E2EA] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
        </nav>
      </FadeIn>

      

      {/* Hero Heading Container */}
      <div className="flex-grow flex items-center justify-center px-4 z-20 mt-6 sm:mt-4 md:-mt-5">
        <div className="overflow-hidden w-full text-center">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] select-none opacity-90">
              Hi, i&apos;m dhanush
            </h1>
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

        <FadeIn delay={0.5} y={20}>
          <ContactButton id="hero-btn-contact" onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
}
