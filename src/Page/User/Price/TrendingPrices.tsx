import { useEffect, useState } from 'react';
import { naira } from '../../../Component/Utils/Utils';

interface TrendingPricesProps {
  item: any;
}

const TrendingPrices: React.FC<TrendingPricesProps> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(!loading);
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div>
        <div className=" m-5">
          <div className="flex justify-between items-center border-b border-default pb-2">
            <span className='font-medium'>{item.service}</span>
            <span className="font-bold">{naira}{item.priceamount}</span>
          </div>  
        </div>
    </div>
  );
};

export default TrendingPrices;
