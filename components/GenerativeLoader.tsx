import React from 'react';
import { motion } from 'framer-motion';

const phrases = [
  "Weaving the narrative...",
  "Consulting the muses...",
  "Designing layout...",
  "Selecting typography...",
  "Polishing pixels...",
  "Orchestrating animations..."
];

export const GenerativeLoader: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white font-sans">
      <div className="relative mb-12">
        {/* Glowing Orb */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full border-2 border-white/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 w-28 h-28 rounded-full border border-white/40 border-t-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.p
        key={phraseIndex}
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
        className="text-xl font-light tracking-[0.3em] text-white/80 uppercase"
      >
        {phrases[phraseIndex]}
      </motion.p>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/30 rounded-full blur-[150px] animate-pulse" />
      </div>
    </div>
  );
};