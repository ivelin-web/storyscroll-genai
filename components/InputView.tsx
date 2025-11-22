import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface InputViewProps {
  onSubmit: (topic: string) => void;
}

export const InputView: React.FC<InputViewProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-black font-sans">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]"
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-xl text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-300 tracking-wide uppercase font-medium">Powered by Gemini 2.5 Flash</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white tracking-tight leading-tight">
          What story shall <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">we tell today?</span>
        </h1>

        <p className="text-lg text-gray-400 mb-12 font-light max-w-md mx-auto leading-relaxed">
          Enter a topic, product, or idea. We'll generate a cinematic landing page experience for it instantly.
        </p>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-black/50 border border-white/10 rounded-full p-2 focus-within:border-white/30 transition-colors backdrop-blur-xl">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The Colonization of Mars, Premium Coffee..."
              className="flex-1 bg-transparent border-none outline-none text-white px-6 py-4 text-lg placeholder-gray-600 font-light"
              autoFocus
            />
            <button
              type="submit"
              disabled={!topic.trim()}
              className="p-4 bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </form>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {["Space Travel", "Sustainable Fashion", "Cyberpunk City", "Zen Gardens"].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSubmit(suggestion)}
              className="px-4 py-2 rounded-full text-sm bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-gray-400 hover:text-white font-light tracking-wide"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};