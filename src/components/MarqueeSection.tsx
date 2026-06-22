import React, { useRef, useState, useEffect } from 'react';

const gifs = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'
];

// Row 1: first 11 images
const row1 = gifs.slice(0, 11);
// Row 2: remaining 10 images
const row2 = gifs.slice(11);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const currentScrollY = window.scrollY;

      // Scroll offset formula: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const offset = (currentScrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Tripled lists for high-fidelity continuous seamless scrolling on infinite visual bounds
  const row1Triple = [...row1, ...row1, ...row1];
  const row2Triple = [...row2, ...row2, ...row2];

  // Starting index translation adjustments to center the stream
  const baseShift = -2000; // Shift starting center bounds so there are no empty gaps on either side
  const row1X = baseShift + (scrollOffset - 200);
  const row2X = baseShift - (scrollOffset - 200);

  return (
    <section
      ref={sectionRef}
      id="marquee-section"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3 w-full border-b border-white/5 marquee-mask"
    >
      {/* Row 1: Moves RIGHT on scroll */}
      <div 
        className="flex gap-3 whitespace-nowrap"
        style={{
          transform: `translateX(${row1X}px)`,
          willChange: 'transform',
        }}
      >
        {row1Triple.map((url, index) => (
          <div
            key={`row1-tile-${index}`}
            className="flex-shrink-0 w-[420px] h-[270px] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5"
          >
            <img
              src={url}
              alt={`Row 1 Animation Portfolio Item ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      {/* Row 2: Moves LEFT on scroll */}
      <div 
        className="flex gap-3 whitespace-nowrap"
        style={{
          transform: `translateX(${row2X}px)`,
          willChange: 'transform',
        }}
      >
        {row2Triple.map((url, index) => (
          <div
            key={`row2-tile-${index}`}
            className="flex-shrink-0 w-[420px] h-[270px] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5"
          >
            <img
              src={url}
              alt={`Row 2 Animation Portfolio Item ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
