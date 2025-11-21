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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden mb-8">
        <motion.div 
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
        />
      </div>
      
      <motion.p 
        key={phraseIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-xl font-light tracking-widest text-gray-400 uppercase"
      >
        {phrases[phraseIndex]}
      </motion.p>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] animate-pulse" />
      </div>
    </div>
  );
};