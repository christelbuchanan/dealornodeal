import React from 'react';
import { Trophy, DollarSign, Briefcase } from 'lucide-react';

interface GameOverProps {
  result: {
    deal: boolean;
    amount: number;
  };
  onPlayAgain: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ result, onPlayAgain }) => {
  const formatAmount = (val: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: val < 1 ? 2 : 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-70 rounded-xl p-8 max-w-2xl w-full text-center">
        <div className="mb-6">
          {result.deal ? (
            <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-12 h-12 text-white" />
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto bg-game-gold rounded-full flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-black" />
            </div>
          )}
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Game Over</h1>
        
        {result.deal ? (
          <p className="text-xl mb-6">
            You accepted the banker's offer of <span className="text-game-gold font-bold">{formatAmount(result.amount)}</span>
          </p>
        ) : (
          <p className="text-xl mb-6">
            You kept your case and won <span className="text-game-gold font-bold">{formatAmount(result.amount)}</span>
          </p>
        )}
        
        <div className="animate-float mb-10">
          <div className="text-5xl font-bold text-game-gold">
            {formatAmount(result.amount)}
          </div>
        </div>
        
        <button 
          className="btn btn-start flex items-center mx-auto"
          onClick={onPlayAgain}
        >
          <Trophy className="mr-2" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
