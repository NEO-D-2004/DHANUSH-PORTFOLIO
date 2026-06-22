import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mail, MapPin, Award, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      // Smooth reset success popup after some seconds
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0C0C0C]/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative bg-[#111111] border-2 border-[#D7E2EA]/20 rounded-[30px] sm:rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col p-6 sm:p-8 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-[#D7E2EA] hover:text-white hover:scale-110 active:scale-95 transition-all p-2 rounded-full bg-white/5 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
              {/* Left Column: Contact details */}
              <div className="md:col-span-5 flex flex-col justify-between gap-6 text-left">
                <div>
                  <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest font-light block mb-2">
                    Get in touch
                  </span>
                  <h3 className="hero-heading text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none mb-4">
                    DHANUSH
                  </h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                    Computer Science Engineering graduate &amp; Developer specializing in AI and Custom Software.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-neutral-300">
                    <Mail size={18} className="text-zinc-500" />
                    <a href="mailto:k.a.dhanush008@gmail.com" className="text-sm hover:underline hover:text-[#D7E2EA]">
                      k.a.dhanush008@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <MapPin size={18} className="text-zinc-500" />
                    <span className="text-sm">India / Remote</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <Award size={18} className="text-zinc-500" />
                    <span className="text-sm">B.E. Computer Science</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                  Available for select collaborations
                </div>
              </div>

              {/* Right Column: Submission Form */}
              <div className="md:col-span-7 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <CheckCircle size={56} className="text-[#B600A8] mb-4 animate-pulse" />
                      <h4 className="text-xl font-bold uppercase text-[#D7E2EA] mb-2">
                        Message Sent
                      </h4>
                      <p className="text-sm text-neutral-400 max-w-[200px]">
                        Thank you! Dhanush will get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-4 text-left"
                    >
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 font-medium">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#0C0C0C] border-2 border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] focus:border-[#B600A8] focus:outline-none transition-colors"
                          placeholder="What's your name?"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 font-medium">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#0C0C0C] border-2 border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] focus:border-[#B600A8] focus:outline-none transition-colors"
                          placeholder="How can we reach you?"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5 font-medium">
                          Your Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-[#0C0C0C] border-2 border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] focus:border-[#B600A8] focus:outline-none transition-colors resize-none"
                          placeholder="Let me know about your project!"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#7621B0] hover:opacity-90 active:scale-95 text-white text-xs font-semibold uppercase tracking-widest py-3 border-2 border-white/10 shadow-lg cursor-pointer transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send size={14} />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
