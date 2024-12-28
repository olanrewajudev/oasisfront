import React, { useState, MouseEvent } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { Link } from 'react-router-dom'

interface AdminSidebarProps {
    handleLogs: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ handleLogs }) => {
    const [view, setView] = useState<string>('')

    const handleView = (tag: string) => {
        setView(view !== tag ? tag : '')
    }

    return (
        <div>
            <div className="flex flex-col text-navy">
                <Link to='/auth/admin' className='text-xl font-semibold py-5 border-b px-3 border-slate-100 capitalize'>Dashboard</Link>
                <Link to='/auth/admin/category/manage' className='font-semibold text-xl py-5 border-b px-3 border-slate-100 capitalize'>Categories</Link>
                <div className="cursor-pointer py-3 border-b px-3 border-slate-100">
                    <div onClick={() => handleView('service')} className="flex items-center justify-between font-semibold text-xl capitalize mb-2">Services <SlArrowDown className='text-xs' /></div>
                    {view === 'service' && (
                        <div className="flex flex-col">
                            <Link to='/auth/admin/service/new' className='font-semibold text-xl flex items-center gap-2 capitalize px-3 py-2'>
                                <div className="p-1 rounded-full bg-light w-fit"></div> new Services
                            </Link>
                            <Link to='/auth/admin/service' className='font-semibold text-xl flex items-center gap-2 capitalize px-3 py-2'>
                                <div className="p-1 rounded-full bg-light w-fit"></div> all Services
                            </Link>
                        </div>
                    )}
                </div>
                
                <div className="cursor-pointer py-3 border-b px-3 border-slate-100">
                    <div onClick={() => handleView('price')} className="flex items-center justify-between font-semibold text-xl capitalize mb-2">Prices <SlArrowDown className='text-xs' /></div>
                    {view === 'price' && (
                        <div className="flex flex-col">
                            <Link to='/auth/admin/price/new' className='font-semibold text-xl flex items-center gap-2 capitalize px-3 py-2'>
                                <div className="p-1 rounded-full bg-light w-fit"></div> new Prices
                            </Link>
                            <Link to='/auth/admin/price' className='font-semibold text-xl flex items-center gap-2 capitalize px-3 py-2'>
                                <div className="p-1 rounded-full bg-light w-fit"></div> all Prices
                            </Link>
                        </div>
                    )}
                </div>
                <Link to='/auth/admin/booking' className='font-semibold text-xl py-5 border-b px-3 border-slate-100 capitalize'>Bookings</Link>     
                <Link to='/auth/admin/review' className='font-semibold text-xl py-5 border-b px-3 border-slate-100 capitalize'>Reviews</Link>     

                <Link to='/auth/admin/section' className='font-semibold text-xl py-5 border-b px-3 border-slate-100 capitalize'>Sections</Link>
                <Link to='/auth/admin/professional' className='font-semibold text-xl py-5 border-b px-3 border-slate-100 capitalize'>professional</Link>
                <Link to='' onClick={handleLogs} className='font-semibold text-xl py-5 border-b px-3 border-slate-100 capitalize'>logout</Link>
            </div>
        </div>
    )
}

export default AdminSidebar
