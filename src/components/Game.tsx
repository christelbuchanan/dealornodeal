import React, { useState, useEffect } from 'react';
import { Trophy, DollarSign, Phone } from 'lucide-react';
import Briefcase from './Briefcase';
import MoneyBoard from './MoneyBoard';
import BankerOffer from './BankerOffer';
import GameOver from './GameOver';
import StartScreen from './StartScreen';

// Game constants
const TOTAL_CASES = 26;
const MONEY_VALUES = [
  0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 
  10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000
];

// Game phases
enum GamePhase {
  START,
  SELECT_PLAYER_CASE,
  OPEN_CASES,
  BANKER_OFFER,
  GAME_OVER
}

const Game: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.START);
  const [cases, setCases] = useState<Array<{ id: number; value: number; opened: boolean }>>([]);
  const [playerCaseId, setPlayerCaseId] = useState<number | null>(null);
  const [remainingCasesToOpen, setRemainingCasesToOpen] = useState<number>(0);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [bankerOffer, setBankerOffer] = useState<number>(0);
  const [gameResult, setGameResult] = useState<{ deal: boolean; amount: number } | null>(null);
  const [eliminatedValues, setEliminatedValues] = useState<number[]>([]);

  // Initialize game
  useEffect(() => {
    if (gamePhase === GamePhase.START) {
      return; // Don't initialize until player starts game
    }
    
    // Shuffle money values and assign to cases
    const shuffledValues = [...MONEY_VALUES].sort(() => Math.random() - 0.5);
    const initialCases = Array.from({ length: TOTAL_CASES }, (_, i) => ({
      id: i + 1,
      value: shuffledValues[i],
      opened: false
    }));
    
    setCases(initialCases);
    setEliminatedValues([]);
    
    // Set cases to open in first round
    setRemainingCasesToOpen(6);
  }, [gamePhase === GamePhase.SELECT_PLAYER_CASE]);

  // Handle player selecting their case
  const handleSelectPlayerCase = (caseId: number) => {
    setPlayerCaseId(caseId);
    setGamePhase(GamePhase.OPEN_CASES);
  };

  // Handle opening a case
  const handleOpenCase = (caseId: number) => {
    if (gamePhase !== GamePhase.OPEN_CASES || caseId === playerCaseId) return;

    // Find the case and mark it as opened
    const updatedCases = cases.map(c => 
      c.id === caseId ? { ...c, opened: true } : c
    );
    
    // Add the value to eliminated values
    const openedCase = cases.find(c => c.id === caseId);
    if (openedCase) {
      setEliminatedValues(prev => [...prev, openedCase.value]);
    }
    
    setCases(updatedCases);
    setRemainingCasesToOpen(prev => prev - 1);

    // Check if round is complete
    if (remainingCasesToOpen === 1) {
      // Move to banker offer phase
      setGamePhase(GamePhase.BANKER_OFFER);
    }
  };

  // Calculate banker offer
  useEffect(() => {
    if (gamePhase === GamePhase.BANKER_OFFER) {
      const remainingValues = cases
        .filter(c => !c.opened && c.id !== playerCaseId)
        .map(c => c.value);
      
      const playerCaseValue = cases.find(c => c.id === playerCaseId)?.value || 0;
      const allRemainingValues = [...remainingValues, playerCaseValue];
      
      // Calculate average of remaining values
      const average = allRemainingValues.reduce((sum, val) => sum + val, 0) / allRemainingValues.length;
      
      // Banker is stingier in early rounds, more generous in later rounds
      const offerPercentage = 0.5 + (roundNumber * 0.05);
      let offer = Math.floor(average * offerPercentage);
      
      // Make offer look more realistic with some rounding
      if (offer > 10000) {
        offer = Math.floor(offer / 1000) * 1000;
      } else if (offer > 1000) {
        offer = Math.floor(offer / 100) * 100;
      } else if (offer > 100) {
        offer = Math.floor(offer / 10) * 10;
      }
      
      setBankerOffer(offer);
    }
  }, [gamePhase, cases, playerCaseId, roundNumber]);

  // Handle player's decision on banker's offer
  const handleBankerOfferResponse = (accepted: boolean) => {
    if (accepted) {
      // Player accepted the deal
      setGameResult({ deal: true, amount: bankerOffer });
      setGamePhase(GamePhase.GAME_OVER);
    } else {
      // Player rejected the deal
      const remainingCases = cases.filter(c => !c.opened && c.id !== playerCaseId).length;
      
      if (remainingCases <= 1) {
        // Only player's case remains, end game
        const playerCaseValue = cases.find(c => c.id === playerCaseId)?.value || 0;
        setGameResult({ deal: false, amount: playerCaseValue });
        setGamePhase(GamePhase.GAME_OVER);
      } else {
        // Continue to next round
        setRoundNumber(prev => prev + 1);
        
        // Determine cases to open in next round
        let casesToOpen;
        if (remainingCases >= 6) casesToOpen = 5;
        else if (remainingCases >= 5) casesToOpen = 4;
        else if (remainingCases >= 4) casesToOpen = 3;
        else if (remainingCases >= 3) casesToOpen = 2;
        else casesToOpen = 1;
        
        setRemainingCasesToOpen(casesToOpen);
        setGamePhase(GamePhase.OPEN_CASES);
      }
    }
  };

  // Start a new game
  const startNewGame = () => {
    setGamePhase(GamePhase.SELECT_PLAYER_CASE);
    setPlayerCaseId(null);
    setRoundNumber(1);
    setBankerOffer(0);
    setGameResult(null);
  };

  // Render game based on current phase
  if (gamePhase === GamePhase.START) {
    return <StartScreen onStart={startNewGame} />;
  }

  if (gamePhase === GamePhase.GAME_OVER && gameResult) {
    return <GameOver result={gameResult} onPlayAgain={startNewGame} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Trophy className="text-game-gold w-8 h-8 mr-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-game-gold">Deal or No Deal</h1>
        </div>
        <div className="text-right">
          <p className="text-lg">Round: {roundNumber}</p>
          {playerCaseId && (
            <p className="text-lg">Your case: <span className="text-game-gold font-bold">#{playerCaseId}</span></p>
          )}
        </div>
      </div>

      {/* Game Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Money Board */}
        <div className="lg:col-span-1">
          <MoneyBoard values={MONEY_VALUES} eliminatedValues={eliminatedValues} />
        </div>

        {/* Center/Right Column - Game Area */}
        <div className="lg:col-span-2">
          {gamePhase === GamePhase.BANKER_OFFER ? (
            <div className="flex flex-col items-center justify-center h-full py-8">
              <div className="mb-8 flex items-center">
                <Phone className="text-white w-8 h-8 mr-2" />
                <h2 className="text-2xl font-bold">Banker's Call</h2>
              </div>
              <BankerOffer 
                amount={bankerOffer} 
                onAccept={() => handleBankerOfferResponse(true)}
                onReject={() => handleBankerOfferResponse(false)}
              />
            </div>
          ) : (
            <>
              {/* Game Instructions */}
              <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-6 text-center">
                {gamePhase === GamePhase.SELECT_PLAYER_CASE ? (
                  <p className="text-xl">Select your briefcase</p>
                ) : (
                  <p className="text-xl">
                    Open {remainingCasesToOpen} more {remainingCasesToOpen === 1 ? 'case' : 'cases'}
                  </p>
                )}
              </div>

              {/* Briefcases Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {Array.from({ length: TOTAL_CASES }, (_, i) => i + 1).map(caseId => {
                  const caseData = cases.find(c => c.id === caseId);
                  return (
                    <Briefcase
                      key={caseId}
                      id={caseId}
                      value={caseData?.value || 0}
                      isOpened={caseData?.opened || false}
                      isPlayerCase={caseId === playerCaseId}
                      onClick={
                        gamePhase === GamePhase.SELECT_PLAYER_CASE
                          ? () => handleSelectPlayerCase(caseId)
                          : () => handleOpenCase(caseId)
                      }
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
