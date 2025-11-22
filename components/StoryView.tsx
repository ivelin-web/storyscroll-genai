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

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center relative z-10 py-24 px-4">
      <motion.div
        className="max-w-3xl w-full relative"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Gradient Border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-sm animate-pulse"></div>

        {/* Main Card */}
        <div
          className="relative rounded-3xl p-10 md:p-14 backdrop-blur-3xl border border-white/20 shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(60, 60, 60, 0.95) 0%, rgba(40, 40, 40, 0.98) 100%)',
          }}
        >
          {/* Top decorative line with section number */}
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="flex items-center justify-center w-16 h-16 rounded-full font-serif font-bold text-2xl border-2"
              style={{
                borderColor: section.colorAccent,
                color: section.colorAccent,
                boxShadow: `0 0 20px ${section.colorAccent}40`
              }}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
            <motion.div
              className="flex-1 h-[2px] rounded-full"
              style={{ background: `linear-gradient(to right, ${section.colorAccent}, transparent)` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>

          {/* Headline */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-black mb-8 leading-[1.1] tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {section.headline}
          </motion.h2>

          {/* Content with staggered reveal */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed font-sans font-light relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {section.content}
          </motion.p>

          {/* Bottom decorative accent */}
          <motion.div
            className="mt-10 w-24 h-1 rounded-full"
            style={{ backgroundColor: section.colorAccent }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.7, duration: 0.6 }}
          />

          {/* Ambient glow */}
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ backgroundColor: section.colorAccent }}
          />
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
        className="fixed top-6 right-6 z-50 p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-all group border border-white/10"
      >
        <RefreshCw className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500" />
      </button>

      {/* Hero Section */}
      <section className="h-screen snap-start relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Hero Background Image */}
          <img
            src={`https://picsum.photos/seed/${data.topic}hero/1920/1080`}
            className="w-full h-full object-cover opacity-50 scale-105 blur-[2px]"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        <motion.div
          className="z-10 text-center px-4 max-w-5xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-black mb-6 tracking-tighter text-white drop-shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {data.title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-3xl text-gray-200 font-sans font-light tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {data.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-0 right-0 w-full text-white/70 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-[0.2em] uppercase font-sans text-center">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Dynamic Story Sections */}
      {data.sections.map((section, i) => (
        <section key={section.id} className="min-h-screen snap-start relative perspective-1000">
          {/* Sticky Background for this section */}
          <div className="sticky top-0 h-screen w-full overflow-hidden -z-10">
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
            >
              <img
                src={`https://picsum.photos/seed/${section.imageKeyword}${i}/1920/1080`}
                alt={section.imageKeyword}
                className="w-full h-full object-cover opacity-40"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/50" />
            {/* Ambient light specific to section */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay transition-colors duration-1000"
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
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white">The End.</h2>
          <button
            onClick={onReset}
            className="px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto shadow-lg hover:shadow-white/20"
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