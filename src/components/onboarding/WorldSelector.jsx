import React from 'react';
import { motion } from 'framer-motion';

const WorldSelector = ({ onSelect }) => {
  return (
    <section className="h-screen w-full relative flex overflow-hidden bg-black">
      {/* Singles World - Left Side */}
      <motion.div 
        whileHover={{ flex: 2 }} // Increased flex for a more dramatic expansion
        onClick={() => onSelect('singles')}
        className="relative flex-1 flex items-center justify-center cursor-pointer group transition-all duration-700 ease-in-out overflow-hidden border-r border-[#D4AF37]/20"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1761794173007-cf35526a89c1?q=80')` }} 
        />
        {/* Pink Glow Overlay for Singles */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="z-10 text-center pointer-events-none">
          <h2 className="text-5xl md:text-7xl font-serif text-[#F5F5F5] group-hover:text-[#ff007f] transition-colors duration-500 drop-shadow-2xl">
            Singles
          </h2>
          <p className="text-[#a89f91] mt-4 tracking-[0.4em] uppercase text-xs opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
            Neon & Party
          </p>
        </div>
      </motion.div>

      {/* Diagonal Divider Line */}
      <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-center">
        <div className="w-px h-[150%] bg-[#D4AF37]/40 rotate-[15deg] shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
      </div>

      {/* Couples World - Right Side */}
      <motion.div 
        whileHover={{ flex: 2 }}
        onClick={() => onSelect('couples')}
        className="relative flex-1 flex items-center justify-center cursor-pointer group transition-all duration-700 ease-in-out overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1749566787207-bd56427f4454?q=80')` }} 
        />
        {/* Gold Glow Overlay for Couples */}
        <div className="absolute inset-0 bg-gradient-to-l from-yellow-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="z-10 text-center pointer-events-none">
          <h2 className="text-5xl md:text-7xl font-serif text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-2xl">
            Couples
          </h2>
          <p className="text-[#a89f91] mt-4 tracking-[0.4em] uppercase text-xs opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
            Sunset & Romance
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default WorldSelector;