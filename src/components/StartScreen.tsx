import React from 'react';
import { Trophy, DollarSign, Briefcase } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-game-blue to-black">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Briefcase className="w-24 h-24 text-game-gold animate-float" />
            <DollarSign className="w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-game-gold">Deal or No Deal</h1>
        
        <p className="text-xl mb-8 text-gray-300 max-w-xl mx-auto">
          Choose a briefcase, then eliminate others to discover if you've selected a fortune or just pocket change. Will you accept the banker's offer or risk it all?
        </p>
        
        <div className="mb-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[1000000, 750000, 500000, 400000, 300000, 200000].map(value => (
            <div key={value} className="money-value money-value-red text-sm md:text-base">
              ${value >= 1000000 ? `${value/1000000}M` : `${value/1000}K`}
            </div>
          ))}
        </div>
        
        <button 
          className="btn btn-start flex items-center mx-auto"
          onClick={onStart}
        >
          <Trophy className="mr-2" />
          Start Game
        </button>
        
        <div className="mt-8 text-sm text-gray-400">
          <p>26 briefcases. 26 different amounts. Choose wisely!</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
