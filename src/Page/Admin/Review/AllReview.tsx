import { useCallback, useEffect, useState } from 'react'
import DeleteReview from './DeleteReview'
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Component/Admin/AdminLayout';
import { Apis, AuthPosturl, Geturl } from '../../../Component/Utils/Api';
import { ToastAlert, ErrorAlert, formatDate } from '../../../Component/Utils/Utils';

interface ReviewItem {
    id: string;
    fullname: string;
    content: string;
    rating: string;
    createdAt: string;
}

const AllReview = () => {
    const [items, setItems] = useState<ReviewItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [del, setDel] = useState<boolean>(false);
    const [singles, setSingles] = useState<any>({});
    const [loads, setLoads] = useState<boolean>(false);

    const fetchAllReviews = useCallback(async () => {
        const res = await Geturl(Apis.services.service_review);
        if (res.status === 200) {
            setLoading(false);
            setItems(res.msg);
        }
    }, []);

    const tableTitle: string[] = [
        "s/n",
        "Fullname",
        "content",
        "rating",
        "date created",
        "edit",
        "delete",
    ];

    const DeleteItem = (item: any) => {
        setDel(!del);
        setSingles(item);
    };

    useEffect(() => {
        fetchAllReviews();
    }, [fetchAllReviews]);

    const confirmAction = async () => {
        const data = { id: singles.id };
        setLoads(!loads);
        const res = await AuthPosturl(Apis.services.delete_review, data);
        setLoads(false);
        if (res.status === 200) {
            fetchAllReviews();
            setDel(!del);
            return ToastAlert(res.msg);
        } else {
            return ErrorAlert(res.msg);
        }
    };

    return (
        <div>
            <AdminLayout>
                {del && <DeleteReview confirmAction={confirmAction} closeView={() => setDel(!del)} />}

                <div className="mx-6">
                    <div className="mt-10 mx-auto pl-3 flex items-center gap-3">
                        <div className="text-2xl font-semibold text-slate-600">All Review</div>
                    </div>
                    <div className=" mx-auto bg-white p-3 rounded-lg shadow-xl mt-5 mb-16 overflow-x-auto scrollsdown">
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
                                        <td className='uppercase text-sm p-3 border max-w-xs truncate' title={item.content} dangerouslySetInnerHTML={{ __html: item.content }}></td>
                                        <td className='uppercase text-sm p-3 border'>{item.rating || `?`}</td>
                                        <td className=' text-sm p-3 border'>{formatDate(new Date(item.createdAt))}</td>
                                        <td className='uppercase text-sm p-3 border'> <Link to={`/auth/admin/review/edit/${item.id}`} className="bg-light text-xs shadow-xl hover:scale-110 transition-all rounded-lg text-white py-2 px-4 uppercase">edit</Link> </td>
                                        <td className='uppercase text-sm p-2 border text-right'> <button onClick={() => DeleteItem(item)} className="bg-primary text-xs rounded-lg text-white py-2 px-4 uppercase">delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </AdminLayout>
        </div>
    )
}

export default AllReview
