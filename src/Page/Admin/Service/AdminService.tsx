import React, { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../../Component/Admin/AdminLayout';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthGeturl, Apis, AuthPosturl } from '../../../Component/Utils/Api';
import { ErrorAlert, formatDate, ToastAlert } from '../../../Component/Utils/Utils';
import DeleteService from './DeleteService';
import ConfirmDuplicateService from './ConfirmDuplicateService';

interface ServiceItem {
    id: string;
    title: string;
    content: string;
    cart?: {
        title: string;
    };
    discountprice: string;
    duration: string | null;
    currentprice: string;
    discount?: string;
    createdAt: string;
}

const AdminService: React.FC = () => {
    const [items, setItems] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [del, setDel] = useState<boolean>(false);
    const [singles, setSingles] = useState<any>({});
    const [loads, setLoads] = useState<boolean>(false);
    const [singleid, setSingleId] = useState<string>('');
    const [view, setView] = useState<boolean>(false);


    const fetchAllServices = useCallback(async () => {
        const res = await AuthGeturl(Apis.services.all_service);
        if (res.status === 200) {
            setLoading(false);
            setItems(res.msg);
        }
    }, []);

    const tableTitle: string[] = [
        "s/n",
        "title",
        "category",
        "content",
        "discount price",
        "current price",
        "discount (%)",
        "duration",
        "date created",
        "edit",
        "delete",
        "duplicate",
    ];


    const DeleteItem = (item: any) => {
        setDel(!del);
        setSingles(item);
    };

    useEffect(() => {
        fetchAllServices();
    }, [fetchAllServices]);

    const handleDup = (id: string) => {
        setSingleId(id);
        setView(!view);
    };

    const resendSignal = () => {
        setView(!view);
        fetchAllServices();
        return ToastAlert('Service Duplicated Successfully!....');
    };
    const confirmAction = async () => {
        const data = { id: singles.id };
        setLoads(!loads);
        const res = await AuthPosturl(Apis.services.delete_service, data);
        setLoads(false);
        if (res.status === 200) {
            fetchAllServices();
            setDel(!del);
            return ToastAlert(res.msg);
        } else {
            return ErrorAlert(res.msg);
        }
    };

    return (
        <div>
            <AdminLayout>
                {del && <DeleteService confirmAction={confirmAction} closeView={() => setDel(!del)} />}
                {view && (
                <ConfirmDuplicateService resendSignal={resendSignal} id={singleid} closeView={() => setView(!view)} />
            )}
                <div className="">
                    <div className="mt-10 w-[99%] mx-auto pl-3 flex items-center gap-3">
                        <div className="text-2xl font-semibold text-slate-600">All Services</div>
                        <Link to='/auth/admin/service/new' className="border border-default text-navy py-3 px-5 rounded-full uppercase hover:bg-light hover:text-navy flex items-center gap-2 text-sm font-semibold"> <FaPlus /> new</Link>
                    </div>
                    <div className="w-[99%] mx-auto bg-white p-3 rounded-lg shadow-xl mt-5 mb-16 overflow-x-auto scrollsdown">
                        {loading && <>
                            <div className="bg-slate-200 animate-pulse rounded-md h-[3rem] mb-3">There is no data yet....</div>
                        </>}
                        {!loading && <table className='w-full border table-auto'>
                            <thead>
                                <tr className='bg-light'>
                                    {tableTitle.map((item, i) => (
                                        <td key={i} className='uppercase text-sm font-semibold text-navy p-2 border'>{item}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 && items.map((item, i) => (
                                    <tr key={i}>
                                        <td className='uppercase text-sm p-3 border'>{i + 1}</td>
                                        <td className='uppercase text-sm p-3 border'>{item.title}</td>
                                        <td className='uppercase text-sm p-3 border'>{item.cart?.title}</td>
                                        <td className='uppercase text-sm p-3 border max-w-xs truncate' title={item.content} dangerouslySetInnerHTML={{ __html: item.content }}></td>
                                        <td className='uppercase text-sm p-3 border'>{item.discountprice || `?`}</td>
                                        <td className='uppercase text-sm p-3 border'>{item.currentprice}</td>
                                        <td className='uppercase text-sm p-3 border'>{item.discount || `?`}</td>
                                        <td className='uppercase text-sm p-3 border'>{(item.duration)}</td>
                                        <td className=' text-sm p-3 border'>{formatDate(new Date(item.createdAt))}</td>
                                        <td className='uppercase text-sm p-3 border'> <Link to={`/auth/admin/service/edit/${item.id}`} className="bg-light text-xs shadow-xl hover:scale-110 transition-all rounded-lg text-navy py-2 px-4 uppercase">edit</Link> </td>
                                        <td className='uppercase text-sm p-2 border text-right'> <button onClick={() => DeleteItem(item)} className="bg-primary text-xs rounded-lg text-white py-2 px-4 uppercase">delete</button></td>
                                        <td className='uppercase text-sm p-3 border'>
                                            <button onClick={() => handleDup(item.id)} className="bg-secondary text-xs rounded-lg text-white py-2 px-4 uppercase">duplicate</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </AdminLayout>
        </div>
    );
};

export default AdminService;
