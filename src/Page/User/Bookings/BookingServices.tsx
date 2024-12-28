import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Apis, AuthGeturl } from '../../../Component/Utils/Api';
import { FaPlus, FaCheck, FaTrash } from 'react-icons/fa';
import { ErrorAlert, LocalData, naira, ToastAlert } from '../../../Component/Utils/Utils';
import { dispatchCart } from '../../../App/reducer';
import { Toaster } from 'react-hot-toast';

interface ServiceItem {
  id: string;
  title: string;
  content: string;
  discountprice: string;
  duration: string | null;
  currentprice: string;
  discount?: string;
}

interface CartItem {
  id: string;
  title: string;
  content: string;
  discountprice: string;
  duration: string | null;
  currentprice: string;
  discount?: string;
}

const BookingServices = () => {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const storedCartItems: CartItem[] = JSON.parse(localStorage.getItem(LocalData) || '[]');
    setCartItems(storedCartItems);
  }, []);

  const AddToCart = async (serviceItem: ServiceItem) => {
    const getLocals: CartItem[] = JSON.parse(localStorage.getItem(LocalData) || '[]');

    if (getLocals.length >= 6) {
      ToastAlert('You can only add up to 6 services in the cart!');
      return;
    }

    const findServiceIndex = getLocals.findIndex((item) => item.id === serviceItem.id);

    if (findServiceIndex === -1) {
      const priceToUse = serviceItem.discountprice && serviceItem.discount ? serviceItem.discountprice : serviceItem.currentprice;

      const dataitem: CartItem = {
        id: serviceItem.id,
        title: serviceItem.title,
        content: serviceItem.content,
        discountprice: priceToUse,
        duration: serviceItem.duration,
        currentprice: serviceItem.currentprice,
        discount: serviceItem.discount,
      };

      getLocals.push(dataitem);
      setCartItems(getLocals);
      ToastAlert('Service added to cart!');
    }

    localStorage.setItem(LocalData, JSON.stringify(getLocals));
    dispatch(dispatchCart(getLocals));

    window.dispatchEvent(new Event('storage'));
  };

  const RemoveFromCart = async (serviceItem: ServiceItem) => {
    const getLocals: CartItem[] = JSON.parse(localStorage.getItem(LocalData) || '[]');

    const updatedCartItems = getLocals.filter((item) => item.id !== serviceItem.id);
    setCartItems(updatedCartItems);
    ToastAlert('Service removed from cart!');

    localStorage.setItem(LocalData, JSON.stringify(updatedCartItems));
    dispatch(dispatchCart(updatedCartItems));

    window.dispatchEvent(new Event('storage'));
  };

  const fetchAllPrices = useCallback(async () => {
    try {
      const res = await AuthGeturl(Apis.services.all_service);
      if (res.status === 200) {
        setItems(res.msg);
      }
    } catch (error) {
      ErrorAlert(`${error}`);
    }
  }, []);

  useEffect(() => {
    fetchAllPrices();
  }, [fetchAllPrices]);

  return (
    <div>
      <div className=''>
        <div className="overflow-x-auto text-navy sticky top-0 left-0 scrollsdown">
          <div className="w-11/12 mx-auto">
            <h3 className='text-4xl font-semibold mb-5'>Select services</h3>
          </div>
        </div>
      </div>
      <div className="w-[100%] mx-auto h-fit">
        <div>
          <div className="pb-10">
            {items.length > 0 &&
              items.map((item: ServiceItem, i: number) => (
                <span className="pb-10" key={i}>
                  <div className="mb-5 flex items-center justify-between px-6 py-2 bg-white text-navy rounded-xl mx-10">
                    <div>
                      <p className="uppercase text-md font-semibold">{item.title}</p>
                      <p className="uppercase text-sm py-1">{item.duration}</p>
                      <div className="flex items-center gap-6">
                        <p className="uppercase text-sm py-2 font-semibold">
                          {naira}
                          {item.discountprice && item.discount ? item.discountprice : item.currentprice}
                        </p>
                        {item.discountprice && item.discount && (
                          <>
                            <p className="line-through text-sm text-gray-500 py-2">{naira}{item.currentprice}</p>
                            <p className="uppercase text-sm py-2 font-semibold">{item.discount}% OFF</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-5'>
                      <div onClick={() => AddToCart(item)} className="border p-2 rounded-lg">
                        {!cartItems.find(cartItem => cartItem.id === item.id) ? <FaPlus /> : <FaCheck />}
                      </div>
                      <div onClick={() => RemoveFromCart(item)} className="border text-red-700 p-2 rounded-lg">
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                </span>
              ))}
          </div>
        </div>
      </div>
      <Toaster position='top-center' />
    </div>
  );
};

export default BookingServices;