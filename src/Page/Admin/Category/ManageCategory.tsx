import React, { useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Apis, AuthGeturl, AuthPosturl } from '../../../Component/Utils/Api';
import { ErrorAlert, formatDate, ToastAlert } from '../../../Component/Utils/Utils';
import CategoryModal from './CategoryModal';
import DeleteCategory from './DeleteCategory';
import AdminLayout from '../../../Component/Admin/AdminLayout';
import Load from '../../../Component/Utils/Load';


const tableTitle: string[] = [
    "s/n",
    "title",
    "date created",
    "edit",
    "delete",
];

const ManageCategory: React.FC = () => {
    const [view, setView] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [del, setDel] = useState<boolean>(false);
    const [items, setItems] = useState<any[]>([]);
    const [singles, setSingles] = useState<any>({});
    const [loads, setLoads] = useState<boolean>(false);

    const fetchALlCategories = useCallback(async () => {
        const res = await AuthGeturl(Apis.category.all_category);
        if (res.status === 200) {
            setLoading(false);
            return setItems(res.msg);
        }
    }, []);

    useEffect(() => {
        fetchALlCategories();
    }, [fetchALlCategories]);

    const SingleItem = (val: any) => {
        setSingles(val);
        setView(!view);
    };
    const DeleteItem = (item: any) => {
        setDel(!del);
        setSingles(item);
    };
    const confirmAction = async () => {
        const data = { id: singles.id };
        setLoads(!loads);
        const res = await AuthPosturl(Apis.category.delete_category, data);
        setLoads(false);
        if (res.status === 200) {
            fetchALlCategories();
            setDel(!del);
            return ToastAlert(res.msg);
        } else {
            return ErrorAlert(res.msg);
        }
    };

    return (

        <AdminLayout>

            {loads && <Load />}
            {view && <CategoryModal singles={singles} resendSignal={() => fetchALlCategories()} closeView={() => setView(!view)} />}
            {del && <DeleteCategory confirmAction={confirmAction} closeView={() => setDel(!del)} />}
            <div className="text-white">
                <div className="mt-10 w-11/12 mx-auto pl-3 flex items-center gap-3">
                    <div className="text-2xl text-navy font-semibold">All Categories</div>
                    <button onClick={() => { setView(!view); setSingles({}) }} className="border border-default text-navy py-3 px-4 rounded-full uppercase hover:bg-light hover:text-white flex items-center gap-2 text-sm font-semibold"> <FaPlus /> new</button>
                </div>
                <div className="w-11/12 mx-auto bg-white p-3 rounded-lg shadow-xl mt-10 mb-16 overflow-x-auto">
                    
                    {!loading && <table className='w-full border table-auto'>
                        <thead>
                            <tr className='bg-light'>
                                {tableTitle.map((item, i) => (
                                    <td key={i} className='uppercase font-semibold text-sm p-2 border'>{item}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 && items.map((item, i) => (
                                <tr key={i}>
                                    <td className='uppercase text-navy text-sm p-2 border'>{i + 1}</td>
                                    <td className='uppercase text-navy text-sm p-2 border'>{item.title}</td>
                                    <td className=' text-sm text-navy p-2 border'>{formatDate(item.createdAt)}</td>
                                    <td className='uppercase text-sm p-2 border text-right'> <button onClick={() => SingleItem(item)} className="bg-light text-xs rounded-lg text-white py-2 px-4 uppercase">edit</button> </td>
                                    <td className='uppercase text-sm p-2 border text-right'> <button onClick={() => DeleteItem(item)} className="bg-primary text-xs rounded-lg text-white py-2 px-4 uppercase">delete</button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageCategory;
