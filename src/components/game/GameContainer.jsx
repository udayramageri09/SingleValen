import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { masterPool } from '../../data/questions.js';

const GameContainer = ({ onFinish }) => {
  // Shuffle and pick 5 questions for this session
  const sessionQuestions = useMemo(() => {
    return [...masterPool].sort(() => 0.5 - Math.random()).slice(0, 5);
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // CLEANUP LOGIC: Removes "Trial Question #X:" prefix if it exists
  const cleanQuestion = (rawText) => {
    return rawText.replace(/Trial Question #\d+:\s*/g, "");
  };

  const handleAnswer = (points) => {
    const newScore = totalScore + points;
    setTotalScore(newScore);

    if (currentIdx < sessionQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Normalizing score to a max of 100 for the leaderboard
      onFinish(Math.min(newScore, 100));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIdx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-10 border border-[#D4AF37]/30 bg-black/80 backdrop-blur-2xl max-w-xl w-full text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Header with clean progress indicator */}
          <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
            <span className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-light">
              The Soul Trial
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i <= currentIdx ? "bg-[#D4AF37]" : "bg-white/10"
                  }`} 
                />
              ))}
            </div>
          </div>
          
          {/* Question Display - Using the cleanQuestion function */}
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-10 italic leading-snug">
            "{cleanQuestion(sessionQuestions[currentIdx].q)}"
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {sessionQuestions[currentIdx].options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.08)", borderColor: "rgba(212, 175, 55, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(opt.p)}
                className="w-full py-4 px-6 border border-white/10 text-white/70 hover:text-white text-sm text-left transition-all duration-500 font-light tracking-wide rounded-sm"
              >
                {opt.t}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      <p className="mt-8 text-[9px] text-white/20 uppercase tracking-[0.6em]">
        Step III: The Trial of Affinity
      </p>
    </div>
  );
};

export default GameContainer;