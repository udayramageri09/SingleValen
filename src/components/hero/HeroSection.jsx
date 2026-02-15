import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const Heart = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const { x, y } = state.mouse;
    if (meshRef.current) {
      meshRef.current.rotation.y = x * 0.5;
      meshRef.current.rotation.x = -y * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial 
          color="#720e1e" 
          speed={3} 
          distort={0.4} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>
    </Float>
  );
};

// Add 'onStart' as a prop here
const HeroSection = ({ onStart }) => {
  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-950">
      {/* 1. The 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#D4AF37" />
          <Suspense fallback={null}>
            <Heart />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      
      {/* 2. The Interactive UI Layer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 text-center flex flex-col items-center gap-8 px-4"
      >
        <div>
          <h1 className="text-6xl md:text-8xl font-serif text-[#D4AF37] mb-4 drop-shadow-2xl">
            HeartQuest 2026
          </h1>
          <p className="text-xl tracking-[0.3em] uppercase text-white opacity-60">
            Cinematic • Mysterious • Luxurious
          </p>
        </div>

        {/* NEW: THE START BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgb(212, 175, 55)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart} // This triggers the state change in App.jsx
          className="relative z-20 px-10 py-4 bg-transparent border-2 border-[#D4AF37] 
                     text-[#D4AF37] font-bold tracking-widest uppercase rounded-sm
                     hover:bg-[#D4AF37] hover:text-slate-950 transition-colors duration-300
                     cursor-pointer pointer-events-auto"
        >
          Begin the Quest
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;