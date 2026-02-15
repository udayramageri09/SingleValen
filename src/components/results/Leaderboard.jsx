import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Leaderboard = ({ onRestart }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Load from local storage
    const savedData = JSON.parse(localStorage.getItem('heartQuest_scores') || '[]');
    setScores(savedData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 border border-[#D4AF37]/30 bg-black/80 backdrop-blur-2xl max-w-2xl w-full text-center"
      >
        <h2 className="text-[#D4AF37] tracking-[0.5em] uppercase text-xs mb-8">Hall of Souls</h2>
        
        <div className="space-y-2 mb-10">
          {scores.length > 0 ? (
            scores.map((entry, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 group">
                <span className="text-white/30 font-mono text-xs">{i + 1}</span>
                <span className="flex-1 text-left ml-6 text-white font-serif italic tracking-wide group-hover:text-[#D4AF37] transition-colors">
                  {entry.name}
                </span>
                <span className="text-[#D4AF37] font-bold tracking-tighter">{entry.score}%</span>
              </div>
            ))
          ) : (
            <p className="text-white/40 italic py-10">The scroll is empty. Be the first to forge a destiny.</p>
          )}
        </div>

        <button 
          onClick={onRestart}
          className="px-10 py-3 border border-[#D4AF37] text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
        >
          Return to Start
        </button>
      </motion.div>
    </div>
  );
};

export default Leaderboard;