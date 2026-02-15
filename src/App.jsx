import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Component Imports
import HeartScene from './components/HeartScene';
import HeroSection from './components/hero/HeroSection';
import NameGenerator from './components/onboarding/NameGenerator';
import WorldSelector from './components/onboarding/WorldSelector';
import GameContainer from './components/game/GameContainer';
import ResultBadge from './components/results/ResultBadge';
import Leaderboard from './components/results/Leaderboard';

function App() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({ name: '', world: '', score: 0 });

  // Logic to save score to Browser Memory
  const saveScoreToLocalStorage = (finalScore) => {
    const newEntry = { 
      name: userData.name || "Anonymous Soul", 
      score: finalScore,
      world: userData.world,
      date: new Date().toLocaleDateString() 
    };

    // Get existing scores or empty array
    const existingScores = JSON.parse(localStorage.getItem('heartQuest_scores') || '[]');
    
    // Add new score, sort by highest first, and keep top 10
    const updatedScores = [...existingScores, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    localStorage.setItem('heartQuest_scores', JSON.stringify(updatedScores));
  };

  return (
    <div className="relative min-h-screen bg-[#0a0202] text-white overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <HeartScene />
      </div>

      <main className="relative z-10 w-full h-screen">
        <AnimatePresence mode="wait">
          
          {step === 0 && <HeroSection key="hero" onStart={() => setStep(1)} />}
          
          {step === 1 && (
            <NameGenerator key="name" onComplete={(name) => {
              setUserData(p => ({ ...p, name }));
              setStep(2); 
            }} />
          )}

          {step === 2 && (
            <WorldSelector key="world" onSelect={(world) => {
              setUserData(p => ({ ...p, world }));
              setStep(3);
            }} />
          )}

          {step === 3 && (
            <GameContainer key="game" onFinish={(score) => {
              setUserData(p => ({ ...p, score }));
              saveScoreToLocalStorage(score); // Save here
              setStep(4);
            }} />
          )}

          {step === 4 && (
            <ResultBadge key="badge" score={userData.score} onContinue={() => setStep(5)} />
          )}

          {step === 5 && (
            <Leaderboard key="leaderboard" onRestart={() => setStep(0)} />
          )}
          
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;