import { useState, useCallback, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Apis, Geturl, offlineServer } from "../../../Component/Utils/Api";

interface Professional {
  fullname: string;
  role: string;
  image: string;
}

interface ProfessionalProps {
  onSelect: (name: string) => void;
  selectedProfessional: string | null;
}

const Professionals = ({ onSelect, selectedProfessional }: ProfessionalProps) => {
  const [items, setItems] = useState<Professional[]>([]);

  const FetchProfessional = useCallback(async () => {
    const res = await Geturl(Apis.professionals.all_professional);
    if (res.status === 200) {
      setItems(res.msg);
    }
  }, []);

  useEffect(() => {
    FetchProfessional();
  }, [FetchProfessional]);

  const handleSelect = (name: string) => {
    onSelect(name);
  };

  return (
    <div>
     <div className=''>
        <div className="overflow-x-auto text-navy sticky top-0 left-0 scrollsdown">
          <div className="w-11/12 mx-auto">
            <h3 className='text-4xl font-semibold mb-5'>Select Professional</h3>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto h-fit grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.length > 0 ? (
          items.map((item, i) => (
            <div
              key={i}
              className={`border rounded-lg shadow-md bg-white flex flex-col py-10 items-center cursor-pointer ${
                selectedProfessional === item.fullname ? "border-light border-2" : ""
              }`}
              onClick={() => handleSelect(item.fullname)}
            >
              {item.image ? (
                <img
                  src={`${offlineServer}/professional/${item.image}`}
                  alt=""
                  className="h-[4rem] rounded-full w-[4rem]"
                />
              ) : (
                "?"
              )}
              <h4 className="text-xl font-semibold">{item.fullname}</h4>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          ))
        ) : (
          <div className="text-center w-full">No professionals available</div>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Professionals;