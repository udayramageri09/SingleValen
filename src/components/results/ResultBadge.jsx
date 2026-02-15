import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Accept 'score' (actual result) and 'onContinue' as props
const ResultBadge = ({ score: finalScore = 0, onContinue }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Count-up animation logic using the dynamic score passed from App.jsx
    let start = 0;
    const duration = 2000; 
    const increment = finalScore / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalScore) {
        setDisplayScore(finalScore);
        clearInterval(timer);
        
        // Luxurious gold/wine confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#720e1e', '#ffffff']
        });
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [finalScore]);

  return (
    // Changed h-screen to py-10 so it fits inside the Results section of App.jsx
    <section className="w-full flex flex-col items-center justify-center bg-transparent">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        className="relative flex flex-col items-center"
      >
        {/* The Badge */}
        <div className="w-64 h-64 rounded-full border-4 border-[#D4AF37] flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0b0b] to-[#0F0505] shadow-[0_0_50px_rgba(212,175,55,0.3)]">
          <img 
            src="https://images.unsplash.com/photo-1707700719529-3986f06a3e98?q=80" 
            alt="Gold Cupid" 
            className="w-16 h-16 mb-2 opacity-80 filter sepia brightness-110"
          />
          <span className="text-6xl font-serif text-[#D4AF37]">{displayScore}%</span>
          <span className="text-[#F5F5F5] uppercase tracking-[0.3em] text-[10px] mt-2 font-light">
            Match found
          </span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-serif text-[#F5F5F5] mb-6">
            A Match Made in the Velvet Lounge
          </h3>
          
          {/* Instead of reload, we show the Leaderboard or Continue */}
          <button 
            onClick={onContinue}
            className="px-10 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0505] transition-all duration-500 rounded-full uppercase tracking-widest text-xs cursor-pointer"
          >
            See the Leaderboard
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ResultBadge;