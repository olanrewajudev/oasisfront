import { useCallback, useEffect, useState } from "react";
import { AuthGeturl, Apis } from "../../Component/Utils/Api";
import { Link } from "react-router-dom";
import AdminLayout from "../../Component/Admin/AdminLayout";
import { SlBell } from "react-icons/sl";
import { formatDate } from "../../Component/Utils/Utils";

interface Feed {
  tag: string;
  total: number;
  bg: string;
}

interface Cart {
  title: string;
}

interface Service {
  id: number;
  title: string;
  oldprice: number;
  currentprice: number;
  discount?: string;
  discountprice?: string;
  duration: string;
  cart?: Cart | null;
  createdAt: Date;
}

const tableTitle = [
  "s/n",
  "title",
  "category",
  "current price",
  "discount",
  "discount price",
  "duration",
  "date created",
  "",
];

const AdminHome = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [, setCart] = useState<Cart[]>([]);
  const [loadingFeeds, setLoadingFeeds] = useState<boolean>(true);
  const [, setLoadingCarts] = useState<boolean>(true);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [items, setItems] = useState<Service[]>([]);

  const fetchAllFeeds = useCallback(async () => {
    const res = await AuthGeturl(Apis.services.feed_admin);
    if (res.status === 200) {
      setFeeds(res.msg);
    }
    setLoadingFeeds(false);
  }, []);

  const fetchAllCart = useCallback(async () => {
    const res = await AuthGeturl(Apis.category.all_category);
    if (res.status === 200) {
      setCart(res.msg);
    }
    setLoadingCarts(false);
  }, []);

  useEffect(() => {
    fetchAllCart();
  }, [fetchAllCart]);

  useEffect(() => {
    fetchAllFeeds();
  }, [fetchAllFeeds]);

  const fetchAllServices = useCallback(async () => {
    const res = await AuthGeturl(Apis.services.all_service);
    if (res.status === 200) {
      setItems(res.msg);
    }
    setLoadingServices(false);
  }, []);

  useEffect(() => {
    fetchAllServices();
  }, [fetchAllServices]);

  return (
    <div>
      <AdminLayout>
        <div className="w-11/12 my-10 mx-auto">
          {!loadingFeeds && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {feeds.map((item, i) => (
                <div className="bg-white mb-2 md:mb-4 hover:-translate-y-5 transition-all rounded-lg shadow-xl" key={i}>
                  <div className="grid grid-cols-5">
                    <div className={`col-span-1 md:col-span-2 bg-light rounded-tl-lg rounded-bl-lg h-32 flex items-center justify-center text-3xl md:text-5xl text-indigo-100`}>
                      <SlBell />
                    </div>
                    <div className="col-span-4 md:col-span-3 p-3">
                      <div className="capitalize font-semibold text-sm text-white bg-light shadow-xl py-2 px-5 w-fit rounded-lg">{item.tag}</div>
                      <div className={`text-right text-2xl md:text-3xl text-white font-bold break-words text-${item.bg}-400`}>{item.total}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-3xl font-bold drop-shadow-lg mt-4 text-navy">All Services</div>
          <div className=" bg-white p-3 rounded-lg shadow-xl mt-5 mb-16 overflow-x-auto scrollsdown">
            {loadingServices ? (
              <div className="text-center py-5">Loading services...</div>
            ) : (
              <table className="w-full border table-auto">
                <thead>
                  <tr className="bg-light text-white">
                    {tableTitle.map((item, i) => (
                      <td key={i} className="uppercase text-sm p-2 border">{item}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item, i) => (
                      <tr key={i}>
                        <td className="uppercase text-sm p-3 border">{i + 1}</td>
                        <td className="uppercase text-sm p-3 border">{item.title}</td>
                        <td className="uppercase text-sm p-3 border">{item.cart?.title || '?'}</td>
                        <td className="uppercase text-sm p-3 border">{item.currentprice}</td>
                        <td className="uppercase text-sm p-3 border">{item.discount || '?'}</td>
                        <td className="uppercase text-sm p-3 border">{item.discountprice || '?'}</td>
                        <td className='uppercase text-sm p-3 border'>{(item.duration)}</td>
                        <td className="text-sm p-3 border">{formatDate(item.createdAt)}</td>
                        <td className="uppercase text-sm p-3 border">
                          <Link
                            to={`/auth/admin/service/edit/${item.id}`} className="bg-light text-xs shadow-xl hover:scale-110 transition-all rounded-lg text-white py-2 px-4 uppercase">edit</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={tableTitle.length} className="text-center p-3">
                        No services available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminHome;
