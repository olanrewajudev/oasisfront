import React, { useState, useCallback, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Component/Admin/AdminLayout";
import { AuthGeturl, Apis, AuthPosturl } from "../../../Component/Utils/Api";
import { ErrorAlert, formatDate, naira, ToastAlert } from "../../../Component/Utils/Utils";
import DeletePrice from "./DeletePrice";
import ConfirmDuplicate from "./ConfirmDuplicate";

interface PriceItem {
    id: string;
    priceamount: number;
    content: string;
    category: string;
    service: string;
    createdAt: Date;
}

const AllPrice: React.FC = () => {
    const [items, setItems] = useState<PriceItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [del, setDel] = useState<boolean>(false);
    const [singles, setSingles] = useState<PriceItem | null>(null);
    const [loads, setLoads] = useState<boolean>(false);
    const [singleid, setSingleId] = useState<string>('');
    const [view, setView] = useState<boolean>(false);

    const fetchAllPrice = useCallback(async () => {
        const res = await AuthGeturl(Apis.prices.all_price);
        if (res.status === 200) {
            setLoading(false);
            setItems(res.msg);
        }
    }, []);

    const tableTitle = ["s/n", "content", "price", "service", "date created", "edit", "delete", "duplicate"];

    useEffect(() => {
        fetchAllPrice();
    }, [fetchAllPrice]);
    
    const DeleteItem = (item: PriceItem) => {
        setDel(!del);
        setSingles(item);
    };

    const handleDup = (id: string) => {
        setSingleId(id);
        setView(!view);
    };

    const resendSignal = () => {
        setView(!view);
        fetchAllPrice();
        return ToastAlert('Price Duplicated Successfully!....');
    };

    const confirmAction = async () => {
        if (!singles) return;
        const data = { id: singles.id };
        setLoads(!loads);
        const res = await AuthPosturl(Apis.prices.delete_price, data);
        setLoads(false);
        if (res.status === 200) {
            fetchAllPrice();
            setDel(!del);
            return ToastAlert(res.msg);
        } else {
            return ErrorAlert(res.msg);
        }
    };

    return (
        <AdminLayout>
            {del && singles && (
                <DeletePrice confirmAction={confirmAction} closeView={() => setDel(!del)} />
            )}
            {view && (
                <ConfirmDuplicate resendSignal={resendSignal} id={singleid} closeView={() => setView(!view)} />
            )}
            <div>
                <div className="mt-10 w-11/12 mx-auto pl-3 text-navy flex items-center gap-3">
                    <div className="text-2xl font-semibold">All Price</div>
                    <Link
                        to='/auth/admin/price/new'
                        className="border border-default text-navy py-3 px-5 rounded-full uppercase hover:bg-light hover:text-white flex items-center gap-2 text-xs"
                    >
                        <FaPlus /> new
                    </Link>
                </div>
                <div className="w-11/12 mx-auto bg-white p-3 rounded-lg shadow-xl mt-10 mb-16 overflow-x-auto scrollsdown">
                    {loading ? (
                        <div className="bg-slate-200 animate-pulse rounded-md h-[3rem] mb-3">There is no data yet....</div>
                    ) : (
                        <table className='w-full border table-auto'>
                            <thead>
                                <tr className='bg-light'>
                                    {tableTitle.map((title, i) => (
                                        <td key={i} className='uppercase text-sm font-semibold text-white p-2 border'>{title}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 && items.map((item, i) => (
                                    <tr key={item.id}>
                                        <td className='uppercase text-sm p-3 border'>{i + 1}</td>
                                        <td className='capitalize text-sm p-3 border' dangerouslySetInnerHTML={{ __html: item.content }}></td>
                                        <td className='capitalize text-sm p-3 border'>{naira}{item.priceamount}</td>
                                        <td className='capitalize text-sm p-3 border'>{item.service}</td>
                                        <td className=' text-sm p-3 border'>{formatDate(new Date(item.createdAt))}</td>
                                        <td className='uppercase text-sm p-3 border'>
                                            <Link to={`/auth/admin/price/edit/${item.id}`}className="bg-default text-xs shadow-xl hover:bg-light rounded-lg text-white py-2  px-4 uppercase">edit</Link></td>
                                        <td className='uppercase text-sm p-2 border text-right'>
                                            <button onClick={() => DeleteItem(item)} className="bg-primary text-xs rounded-lg text-white py-2 px-4 uppercase">delete</button>
                                        </td>
                                        <td className='uppercase text-sm p-3 border'>
                                            <button onClick={() => handleDup(item.id)} className="bg-secondary text-xs rounded-lg text-white py-2 px-4 uppercase">duplicate</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AllPrice;