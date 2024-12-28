import React, { useEffect, useState } from 'react';

interface Price {
  id: string;
  service?: string;
}

interface SingleSectionPriceProps {
  price: Price;
  sendAds: (id: string) => void;
  saved: string;
}

const SingleSectionPrice: React.FC<SingleSectionPriceProps> = ({ price, sendAds, saved }) => {
  const [adds, setAdds] = useState<boolean>(false);

  const handleAdds = () => {
    sendAds(price.id);
    setAdds(!adds);
  };

  useEffect(() => {
    if (saved === 'yes') setAdds(false);
  }, [saved]);

  return (
    <div>
      <div onClick={handleAdds}  className="grid grid-cols-2 mb-2">
        <div className="text-sm cursor-pointer">{price.service?.toLowerCase()}</div>
        <div className="w-fit ml-auto">
          <button 
            type="button" 
            className={`w-5 h-5 ${adds ? 'bg-primary' : 'bg-gray-300'} rounded-full`}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default SingleSectionPrice;
