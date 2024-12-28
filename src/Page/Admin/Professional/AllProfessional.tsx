import React, { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../../Component/Admin/AdminLayout';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthGeturl, Apis, AuthPosturl, offlineServer } from '../../../Component/Utils/Api';
import { ErrorAlert, formatDate, ToastAlert } from '../../../Component/Utils/Utils';
import Deleteprofessional from './DeleteProfessional';

interface ProfessionalItem {
    id: string;
    fullname: string;
    image: string;
    role: string;
    createdAt: string;
}

const AllProfessional: React.FC = () => {
    const [items, setItems] = useState<ProfessionalItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [del, setDel] = useState<boolean>(false);
    const [singles, setSingles] = useState<any>({});
    const [loads, setLoads] = useState<boolean>(false);

    const fetchAllProfessional = useCallback(async () => {
        const res = await AuthGeturl(Apis.professionals.all_professional);
        if (res.status === 200) {
            setLoading(false);
            setItems(res.msg);
        }
    }, []);

    const tableTitle: string[] = [
        "s/n",
        "fullname",
        "image",
        "role",
        "date created",
        "edit",
        "delete",
    ];


    const DeleteItem = (item: any) => {
        setDel(!del);
        setSingles(item);
    };

    useEffect(() => {
        fetchAllProfessional();
    }, [fetchAllProfessional]);

    const confirmAction = async () => {
        const data = { id: singles.id };
        setLoads(!loads);
        const res = await AuthPosturl(Apis.professionals.delete_professional, data);
        setLoads(false);
        if (res.status === 200) {
            fetchAllProfessional();
            setDel(!del);
            return ToastAlert(res.msg);
        } else {
            return ErrorAlert(res.msg);
        }
    };

    return (
        <div>
            <AdminLayout>
                {del && <Deleteprofessional confirmAction={confirmAction} closeView={() => setDel(!del)} />}

                <div className="">
                    <div className="mt-10 w-[99%] mx-auto pl-3 flex items-center gap-3">
                        <div className="text-2xl font-semibold ">All Professional</div>
                        <Link to='/auth/admin/professional/new' className="border border-default text-navy py-3 px-5 rounded-full uppercase hover:bg-light hover:text-white flex items-center gap-2 text-sm font-semibold"> <FaPlus /> new</Link>
                    </div>
                    <div className="w-[99%] mx-auto bg-white p-3 rounded-lg shadow-xl mt-5 mb-16 overflow-x-auto scrollsdown">
                        {loading && <>
                            <div className="bg-slate-200 animate-pulse rounded-md h-[3rem] mb-3">There is no data yet....</div>
                        </>}
                        {!loading && <table className='w-full border table-auto'>
                            <thead>
                                <tr className='bg-light'>
                                    {tableTitle.map((item, i) => (
                                        <td key={i} className='uppercase text-sm font-semibold text-white p-2 border'>{item}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 && items.map((item, i) => (
                                    <tr key={i}>
                                        <td className='uppercase text-sm p-3 border'>{i + 1}</td>
                                        <td className='uppercase text-sm p-3 border'>{item.fullname}</td>
                                        <td className="uppercase text-sm p-2 border text-right">
                                            <div className="flex items-center justify-center">
                                                {item.image ? (
                                                    <img src={`${offlineServer}/professional/${item.image}`} alt="" className="w-20 h-16 object-contain" />
                                                ) : (
                                                    '?'
                                                )}
                                            </div>
                                        </td>
                                        <td className='uppercase text-sm p-3 border'>{item.role}</td>
                                        <td className=' text-sm p-3 border'>{formatDate(new Date(item.createdAt))}</td>
                                        <td className='uppercase text-sm p-3 border'> <Link to={`/auth/admin/professional/edit/${item.id}`} className="bg-light text-xs shadow-xl hover:scale-110 transition-all rounded-lg text-white py-2 px-4 uppercase">edit</Link> </td>
                                        <td className='uppercase text-sm p-2 border text-right'> <button onClick={() => DeleteItem(item)} className="bg-primary text-xs rounded-lg text-white py-2 px-4 uppercase">delete</button></td>

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

export default AllProfessional;
