import React, { useState } from 'react';
import { BookingStatus, formatDate, naira } from '../../../Component/Utils/Utils';

interface BookingItem {
    id: string;
    name: string;
    pricetag: string;
    pricing: string;
    createdAt: string;
    status: string;
}

interface SingleBookingProps {
    item: BookingItem;
    i: number;
    handleUpdating: (item: BookingItem, form: { status?: string }) => void;
}

const SingleBooking: React.FC<SingleBookingProps> = ({ item, i, handleUpdating }) => {
    const [form, setForm] = useState<{ status?: string }>({});
    const [yes, setYes] = useState<boolean>(false);

    const handleForms = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setYes(e.target.value !== '');
    };

    return (
        <tr>
            <td className='uppercase text-sm p-2 border'>{i + 1}</td>
            <td className='uppercase text-sm p-2 border'>{item.name}</td>
            <td className='uppercase text-sm p-2 border'>{naira}{parseFloat(item.pricetag).toLocaleString()}</td>
            <td className='uppercase text-sm p-2 border'>{naira}{parseFloat(item.pricing).toLocaleString()}</td>
            <td className='lowercase text-sm p-2 border'>{formatDate(new Date(item.createdAt))}</td>
            <td className='lowercase text-sm p-2 border'>
                <div className={`${BookingStatus(item.status)} text-xs text-center uppercase py-2 px-3 rounded-md`}>{item.status}</div>
            </td>
            <td className='uppercase text-sm p-2 border'>
                <div className="flex items-center gap-3">
                    <select name="status" value={form.status} onChange={handleForms} className="input !text-xs !px-1 !py-2">
                        <option value="">--Select--</option>
                        {['pending', 'paid', 'delivery pending', 'delivered', 'not interested'].map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                    {yes && <button onClick={() => { handleUpdating(item, form); setYes(false); }} className="bg-slate-800 text-navy p-1 rounded-md text-xs">Update</button>}
                </div>
            </td>
        </tr>
    );
};

export default SingleBooking;
