import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NameGenerator = ({ onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentName, setCurrentName] = useState("?????");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [progress, setProgress] = useState(0);

  const prefix = ["Eternal", "Crimson", "Golden", "Velvet", "Silent", "Mystic", "Royal", "Divine", "Dark", "Luminous"];
  const suffix = ["Soul", "Heart", "Shadow", "Flame", "Spirit", "Echo", "Knight", "Oracle", "Rose", "Drifter"];

  useEffect(() => {
    let interval;
    if (isSpinning) {
      interval = setInterval(() => {
        const randomName = `${prefix[Math.floor(Math.random() * prefix.length)]} ${suffix[Math.floor(Math.random() * suffix.length)]}`;
        setCurrentName(randomName);
        setProgress((prev) => {
          if (prev >= 100) {
            setIsSpinning(false);
            setHasGenerated(true);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-transparent px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 md:p-16 rounded-none border border-[#D4AF37]/30 bg-black/60 backdrop-blur-xl w-full max-w-lg text-center shadow-[0_0_50px_rgba(114,14,30,0.2)]"
      >
        <h2 className="text-[#D4AF37] tracking-[0.4em] uppercase text-[10px] mb-12 font-light">
          Identify Your Soul
        </h2>
        
        {/* Animated Name Display */}
        <div className="h-24 flex items-center justify-center mb-8 border-y border-white/5 py-4">
          <AnimatePresence mode="wait">
            <motion.span 
              key={currentName}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              className="text-4xl md:text-5xl font-serif text-white italic tracking-tight"
            >
              {currentName}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* The Forge Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full mb-12 overflow-hidden">
          <motion.div 
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]"
          />
        </div>

        <div className="flex flex-col gap-6">
          {!hasGenerated && !isSpinning && (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSpinning(true)}
              className="py-4 bg-[#720e1e] text-white text-xs tracking-[0.3em] uppercase hover:bg-red-700 transition-all cursor-pointer shadow-xl"
            >
              Begin the Incantation
            </motion.button>
          )}

          {isSpinning && (
            <p className="text-[#D4AF37] animate-pulse text-[10px] uppercase tracking-widest">
              Consulting the shadows...
            </p>
          )}

          {/* THE CONNECTION BUTTON: Moves to World Selection */}
          {hasGenerated && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: "#D4AF37", color: "#000" }}
              onClick={() => onComplete(currentName)} 
              className="py-4 border border-[#D4AF37] text-[#D4AF37] text-xs tracking-[0.3em] uppercase transition-all duration-500 cursor-pointer"
            >
              Accept Destiny & Choose World
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Background subtitle */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="mt-8 text-[10px] text-white tracking-[0.5em] uppercase"
      >
        Step I: The Naming
      </motion.p>
    </section>
  );
};

export default NameGenerator;