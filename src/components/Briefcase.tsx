import React from 'react';
import { Briefcase as BriefcaseIcon, Check } from 'lucide-react';

interface BriefcaseProps {
  id: number;
  value: number;
  isOpened: boolean;
  isPlayerCase: boolean;
  onClick: () => void;
}

const Briefcase: React.FC<BriefcaseProps> = ({ id, value, isOpened, isPlayerCase, onClick }) => {
  const formatValue = (val: number): string => {
    if (val >= 1000000) return `$${val / 1000000}M`;
    if (val >= 1000) return `$${val / 1000}K`;
    if (val === 0.01) return '1¢';
    return `$${val}`;
  };

  const getClassNames = (): string => {
    let classes = 'briefcase aspect-[3/4] p-2';
    
    if (isOpened) {
      classes += ' briefcase-opened';
    } else if (isPlayerCase) {
      classes += ' briefcase-selected';
    }
    
    return classes;
  };

  return (
    <div className={getClassNames()} onClick={!isOpened || isPlayerCase ? onClick : undefined}>
      {isOpened ? (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-xs md:text-sm">{formatValue(value)}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <BriefcaseIcon className="w-6 h-6 md:w-8 md:h-8 mb-1" />
          <span className="text-lg md:text-xl font-bold">{id}</span>
          {isPlayerCase && <Check className="absolute top-1 right-1 w-4 h-4" />}
        </div>
      )}
    </div>
  );
};

export default Briefcase;
