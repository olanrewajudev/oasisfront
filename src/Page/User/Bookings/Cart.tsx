import React, { useRef, useState, useEffect } from "react";
import { LocalData, naira } from "../../../Component/Utils/Utils";
import moment from 'moment';
import { FaCalendar, FaClock } from "react-icons/fa";

interface CartItem {
  id: number;
  title: string;
  content: string;
  currentprice: string;
  discount: string;
  discountprice: string;
  duration: string; // Expected format: "1 hr, 30 mins"
}

interface CartProps {
  onContinue: () => void;
  isLastStep: boolean;
  selectedProfessional: string | null;
  selectedDate: string;
  selectedTime: string; 
}

const Cart: React.FC<CartProps> = ({
  onContinue,
  isLastStep,
  selectedProfessional,
  selectedDate,
  selectedTime,
}) => {
  const togref = useRef<HTMLDivElement | null>(null);
  const [prodcarts, setProdcart] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const fetchCartItems = () => {
    const carts: CartItem[] = JSON.parse(localStorage.getItem(LocalData) || "[]");
    setProdcart(carts);
    calculateTotal(carts);
    calculateTotalDuration(carts);
  };

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => {
      const price = item.discountprice && item.discount ? parseFloat(item.discountprice) : parseFloat(item.currentprice);
      return sum + price;
    }, 0);
    setTotals(total);
  };

  const calculateTotalDuration = (items: CartItem[]) => {
    const totalDurationMinutes = items.reduce((sum, item) => {
      const match = item.duration.match(/(\d+)\s*hr[s]?\s*,?\s*(\d+)?\s*min[s]?/i);
      if (match) {
        const hours = parseInt(match[1], 10) || 0;
        const minutes = parseInt(match[2], 10) || 0;
        return sum + (hours * 60 + minutes);
      }
      return sum;
    }, 0);
    setTotalDuration(totalDurationMinutes);
  };

  const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hr${hours !== 1 ? 's' : ''}, ${minutes} min${minutes !== 1 ? 's' : ''}`;
  };

  const formatTimeRange = (startTime: string, durationMinutes: number): string => {
    const format = 'HH:mm';
    const start = moment(startTime, format);
    const end = start.clone().add(durationMinutes, 'minutes');
    return `${start.format('h:mm a')} - ${end.format('h:mm a')}`;
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      fetchCartItems();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getUpdatedDuration = (item: CartItem) => {
    if (selectedProfessional) {
      return `${item.duration}, with ${selectedProfessional}`;
    }
    return item.duration;
  };

  const isCartEmpty = prodcarts.length === 0;

  const formattedDate = selectedDate ? moment(selectedDate).format('dddd, D MMMM') : '';
  const timeRange = selectedTime ? formatTimeRange(selectedTime, totalDuration) : '';

  const showDetails = formattedDate || timeRange || totalDuration > 0;

  return (
    <div className="bg-white text-navy rounded-lg relative py-3">
      <div className="" ref={togref}>
        {isCartEmpty ? (
          <div className="p-4">
            <div className="text-md font-semibold">No services selected</div>
          </div>
        ) : (
          <div className="h-[25rem] overflow-auto scrollsdown">
            {prodcarts.map((item) => (
              <div key={item.id} className="p-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-md">{item.title}</h3>
                    <p>{getUpdatedDuration(item)}</p>
                  </div>
                  <p className="font-semibold text-md">
                    {naira}
                    {(item.discountprice && item.discount ? parseFloat(item.discountprice) : parseFloat(item.currentprice)).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {showDetails && (
          <div className="border-t">
            <div className="p-4">
              {formattedDate && <p className="font-medium flex gap-1 items-center"><FaCalendar />{formattedDate}</p>}
              {timeRange && <div className="flex gap-1 mt-2 items-center">
                <p className="font-medium flex gap-1 items-center"><FaClock />{timeRange}</p>
                <p className="font-medium">({formatDuration(totalDuration)} Duration)</p>
              </div>}
            </div>
          </div>
        )}

        {!isCartEmpty && (
          <div className="flex items-center p-4 text-md font-semibold justify-between">
            <div className="uppercase">Total Price</div>
            <div>{naira}{totals.toLocaleString()}</div>
          </div>
        )}

        <div
          onClick={!isCartEmpty && !isLastStep ? onContinue : undefined}
          className={`bg-light mx-4 text-center rounded-lg p-3 mt-6 cursor-pointer ${isCartEmpty || isLastStep ? "opacity-50" : "opacity-100"}`}
        >
          <button
            className="text-lg font-semibold text-white"
            disabled={isCartEmpty || isLastStep}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
