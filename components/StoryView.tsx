import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { StoryData, StorySection } from '../types';
import { ArrowDown, RefreshCw } from 'lucide-react';

interface StoryViewProps {
  data: StoryData;
  onReset: () => void;
}

const SectionCard: React.FC<{ section: StorySection; index: number }> = ({ section, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center relative z-10 py-24">
      <motion.div 
        className="max-w-2xl w-full mx-6 p-8 md:p-12 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative"
        style={{
            background: 'rgba(20, 20, 20, 0.6)',
        }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Decorative glow based on section color */}
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-40 pointer-events-none"
          style={{ backgroundColor: section.colorAccent }}
        />

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight relative z-10">
          {section.headline}
        </h2>
        <div className="w-12 h-1 bg-white/30 mb-6 relative z-10" />
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light relative z-10">
          {section.content}
        </p>
        
        <div className="absolute bottom-4 right-4 text-white/10 text-9xl font-serif font-bold -z-0 select-none">
          0{index + 1}
        </div>
      </motion.div>
    </div>
  );
};

export const StoryView: React.FC<StoryViewProps> = ({ data, onReset }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory bg-black relative no-scrollbar">
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Reset Button */}
      <button 
        onClick={onReset}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all group"
      >
        <RefreshCw className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500" />
      </button>

      {/* Hero Section */}
      <section className="h-screen snap-start relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Hero Background Image */}
           <img 
             src={`https://picsum.photos/seed/${data.topic}hero/1920/1080`} 
             className="w-full h-full object-cover opacity-40 scale-105 blur-sm"
             alt="Hero"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
        </div>

        <motion.div 
          className="z-10 text-center px-4 max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {data.title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-3xl text-gray-300 font-light italic"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {data.subtitle}
          </motion.p>
        </motion.div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Dynamic Story Sections */}
      {data.sections.map((section, i) => (
        <section key={section.id} className="min-h-screen snap-start relative">
          {/* Sticky Background for this section */}
          <div className="sticky top-0 h-screen w-full overflow-hidden -z-10">
             <img 
               src={`https://picsum.photos/seed/${section.imageKeyword}${i}/1920/1080?grayscale`}
               alt={section.imageKeyword}
               className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-[10s] ease-out hover:scale-110"
             />
             <div className="absolute inset-0 bg-black/60" />
             {/* Ambient light specific to section */}
             <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay transition-colors duration-1000"
                style={{ background: `radial-gradient(circle at 50% 50%, ${section.colorAccent}, transparent 70%)` }}
             />
          </div>
          
          {/* Floating Content */}
          <div className="relative z-10 -mt-[100vh]">
             <SectionCard section={section} index={i} />
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="h-[50vh] snap-end bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-white">The End.</h2>
          <button 
            onClick={onReset}
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Create Another Story
          </button>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </footer>
    </div>
  );
};