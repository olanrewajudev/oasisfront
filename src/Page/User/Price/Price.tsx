import React, { useCallback, useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import Layout from "../../../Component/User/Layout";
import { Apis, AuthGeturl, Geturl, offlineServer } from "../../../Component/Utils/Api";
import TrendingPrices from "./TrendingPrices";

interface PriceItem {
  id: string;
  title: string;
  content: string;
  name: string;
  priceamount: number;
  service: string;
  maincategory: number;
}

interface Section {
  id: string;
  title: string;
  slug: string;
  image?: string; 
  secs: {
    secprice: PriceItem[];
  }[];
}

interface Price {
  id: string;
  title: string;
}

const Price: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [, setPrices] = useState<Price[]>([]);
  const [, setLoading] = useState(true);

  const fetchAllPriceSections = useCallback(async () => {
    const res = await Geturl(Apis.prices.home_sections);
    if (res.status === 200) {
      setSections(res.msg);
    }
  }, []);

  const fetchAllPrices = useCallback(async () => {
    const res = await AuthGeturl(Apis.prices.all_price);
    if (res.status === 200) {
      setPrices(res.msg);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllPrices();
  }, [fetchAllPrices]);

  useEffect(() => {
    fetchAllPriceSections();
  }, [fetchAllPriceSections]);

  return (
    <div>
      <Layout>
        <div className="bg-light text-white py-32 lg:py-20">
          <div className="text-center text-4xl font-semibold  my-4">PRICING LIST</div>
          <div className="flex items-center justify-center text-center">
            <span className="font-semibold text-lg mx-2">HOME</span>
            <FaGreaterThan />
            <span className="underline font-semibold text-lg mx-2">PRICING LIST</span>
          </div>
        </div>
       

        <div className="lg:mx-10 mx-3 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-5 lg:grid-cols-3">
            {sections.length > 0 &&
              sections.map((item) => (
                <section key={item.id}>
                  <div>
                    <div className="text-center py-6 text-3xl text-navy font-semibold">
                      {item.title}
                    </div>
                  </div>

                  <div className="bg-light border text-white rounded-3xl mx-auto">
                    <div className="mb-10">{item.image ? (<img src={`${offlineServer}/sections/${item.image}`} alt="" className="h-[16rem] md:h-[24rem] rounded-t-3xl object-cover lg:w-[32rem] w-full" />) : ('?')}
                    </div>
                    {item.secs.map((data, k) => (
                      <div key={k}>
                        <TrendingPrices item={data.secprice} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Price;
