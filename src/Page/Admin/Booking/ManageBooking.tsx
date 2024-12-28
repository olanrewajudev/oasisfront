import { useState, useCallback, useEffect } from 'react';
import AdminLayout from '../../../Component/Admin/AdminLayout';
import { AuthGeturl, Apis, AuthPosturl } from '../../../Component/Utils/Api';
import { ToastAlert, ErrorAlert } from '../../../Component/Utils/Utils';
import SingleBooking from './SingleBooking';

interface BookingItem {
    id: string;
    name: string;
    pricetag: string;
    pricing: string;
    createdAt: string;
    status: string;
}

const ManageBooking: React.FC = () => {
    const [items, setItems] = useState<BookingItem[]>([]);
    const [loads, setLoads] = useState<boolean>(true);

    const tableHeaders = [
        `S/N`,
        "service name",
        "initial price",
        "purchasing price",
        "date initiated",
        "status",
        "",
    ];

    const fetchAllCategories = useCallback(async () => {
        try {
            const res = await AuthGeturl(Apis.services.all_bookings);
            if (res.status === 200) {
                setLoads(false);
                setItems(res.msg);
            } else {
                throw new Error(res.msg);
            }
        } catch (error: any) {
            setLoads(false);
            ErrorAlert(error.message);
        }
    }, []);

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories]);

    const handleUpdating = async (item: BookingItem, form: { status?: string }) => {
        const formdata = {
            id: item.id,
            status: form.status
        };
        const res = await AuthPosturl(Apis.services.update_booking, formdata);
        if (res.status === 200) {
            ToastAlert(res.msg);
            fetchAllCategories();
        } else {
            ErrorAlert(res.msg);
        }
    };

    return (
        <AdminLayout>
            <div className="text-white">
                <div className="mt-10 w-11/12 mx-auto pl-3 flex items-center gap-3">
                    <div className="text-2xl font-semibold">All Bookings</div>
                </div>
                <div className="w-11/12 mx-auto p-3 mt-10 mb-16">
                    {loads ? (
                        <>
                            <div className="bg-slate-200 animate-pulse rounded-md h-[3rem] mb-3">There is no data yet....</div>
                        </>
                    ) : (
                        <table className="w-full border bg-white shadow-xl rounded-xl table-auto">
                            <thead>
                                <tr className="bg-light">
                                    {tableHeaders.map((header, i) => (
                                        <td key={i} className="uppercase text-sm p-2 border">{header}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 ? (
                                    items.map((item, i) => (
                                        <SingleBooking key={i} item={item} i={i} handleUpdating={handleUpdating} />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={tableHeaders.length} className="text-center p-4">
                                            No bookings found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageBooking;
