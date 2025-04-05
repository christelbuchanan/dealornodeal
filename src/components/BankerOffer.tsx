import React from 'react';
import { Phone, Check, X } from 'lucide-react';

interface BankerOfferProps {
  amount: number;
  onAccept: () => void;
  onReject: () => void;
}

const BankerOffer: React.FC<BankerOfferProps> = ({ amount, onAccept, onReject }) => {
  const formatAmount = (val: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="banker-offer mb-10">
        {formatAmount(amount)}
      </div>
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Deal or No Deal?</h3>
        <p className="text-gray-300">The banker offers you {formatAmount(amount)} for your case.</p>
      </div>
      
      <div className="flex space-x-6">
        <button 
          className="btn btn-deal flex items-center" 
          onClick={onAccept}
        >
          <Check className="mr-2" />
          DEAL
        </button>
        <button 
          className="btn btn-no-deal flex items-center" 
          onClick={onReject}
        >
          <X className="mr-2" />
          NO DEAL
        </button>
      </div>
    </div>
  );
};

export default BankerOffer;
