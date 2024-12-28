import React, { useEffect, useState } from "react";

interface EditSinglePriceProps {
  prices: {
    id: string;
    service?: string;
  };
  sendAds: (priceId: string) => void;
  prics: string[];
  saved: string;
}

const EditSinglePrice: React.FC<EditSinglePriceProps> = ({ prices, sendAds, prics, saved }) => {
  const [adds, setAdds] = useState<boolean>(prics.includes(prices.id));

  const handleAdds = () => {
    if (adds) {
      sendAds(prices.id);
      setAdds(false);
    } else {
      sendAds(prices.id);
      setAdds(true);
    }
  };

  useEffect(() => {
    if (saved === "yes") {
      setAdds(false);
    }
  }, [saved]);

  return (
    <div>
      <div onClick={handleAdds} className="grid grid-cols-2 mb-2">
        <div className="text-sm cursor-pointer">{prices.service?.toLowerCase()}</div>
        <div className="w-fit ml-auto">
          <button
                        type="button"
            className={`w-5 h-5 ${adds ? "bg-primary" : "bg-gray-300"} rounded-full`}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default EditSinglePrice;
