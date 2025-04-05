import React from 'react';
import { DollarSign } from 'lucide-react';

interface MoneyBoardProps {
  values: number[];
  eliminatedValues: number[];
}

const MoneyBoard: React.FC<MoneyBoardProps> = ({ values, eliminatedValues }) => {
  // Sort values in descending order
  const sortedValues = [...values].sort((a, b) => b - a);
  
  // Split into two columns
  const midpoint = Math.ceil(sortedValues.length / 2);
  const leftColumn = sortedValues.slice(0, midpoint);
  const rightColumn = sortedValues.slice(midpoint);

  const formatValue = (val: number): string => {
    if (val >= 1000000) return `$${val / 1000000}M`;
    if (val >= 1000) return `$${val / 1000}K`;
    if (val === 0.01) return '1¢';
    return `$${val}`;
  };

  const isEliminated = (value: number): boolean => {
    return eliminatedValues.includes(value);
  };

  const getValueClass = (value: number): string => {
    let classes = 'money-value mb-2';
    
    // Red for high values, blue for low values
    if (value >= 75000) {
      classes += ' money-value-red';
    } else {
      classes += ' money-value-blue';
    }
    
    // Add eliminated class if needed
    if (isEliminated(value)) {
      classes += ' money-value-eliminated';
    }
    
    return classes;
  };

  return (
    <div className="bg-black bg-opacity-50 p-4 rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <DollarSign className="text-game-gold w-6 h-6 mr-2" />
        <h2 className="text-xl font-bold">Money Board</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div>
          {leftColumn.map((value) => (
            <div key={`left-${value}`} className={getValueClass(value)}>
              {formatValue(value)}
            </div>
          ))}
        </div>
        <div>
          {rightColumn.map((value) => (
            <div key={`right-${value}`} className={getValueClass(value)}>
              {formatValue(value)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoneyBoard;
