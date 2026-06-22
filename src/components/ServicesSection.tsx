import React from 'react';
import FadeIn from './FadeIn';
import { ServiceItem } from '../types';

export default function ServicesSection() {
  const services: ServiceItem[] = [
    {
      id: 'service-01',
      number: '01',
      name: 'Custom Software Development',
      description: 'Developing desktop, web, and automation solutions tailored to business and personal requirements.',
    },
    {
      id: 'service-02',
      number: '02',
      name: 'Web Development',
      description: 'Designing and developing responsive, modern websites and web applications.',
    },
    {
      id: 'service-03',
      number: '03',
      name: 'AI Solutions Development',
      description: 'Building intelligent applications using Generative AI, LLMs, NVIDIA NIM APIs, Gemini APIs, and AI automation workflows.',
    },
    {
      id: 'service-04',
      number: '04',
      name: 'Automation & API Integration',
      description: 'Building automated workflows, AI assistants, bots, and integrating third-party APIs to improve efficiency and reduce manual work.',
    },
  ];

  return (
    <section 
      id="services-section" 
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20 w-full"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Services Section Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2 
            className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Services List Block */}
        <div className="w-full border-t border-[rgba(12,12,12,0.15)] flex flex-col">
          {services.map((item, index) => (
            <FadeIn 
              key={item.id} 
              delay={index * 0.1} 
              y={30}
              className="border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 w-full"
            >
              <div className="flex flex-row items-start gap-4 sm:gap-8 md:gap-14 w-full text-left">
                {/* ID/Number representation */}
                <span 
                  className="font-black text-[#0C0C0C] flex-shrink-0 leading-none select-none min-w-[50px] sm:min-w-[100px] md:min-w-[140px]"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 140px)' }}
                >
                  {item.number}
                </span>

                {/* Service Details on the right */}
                <div className="flex-grow flex flex-col justify-center">
                  <h3 
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.name}
                  </h3>
                  <p 
                    className="font-light leading-relaxed text-[#0C0C0C] opacity-60 mt-2 sm:mt-3 max-w-2xl"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
