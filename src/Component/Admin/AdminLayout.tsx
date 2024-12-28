import React, { useState, ReactNode, MouseEvent } from 'react'
import AdminSidebar from './AdminSidebar'
import { FaTimes } from 'react-icons/fa'
import { SlMenu, SlPower } from 'react-icons/sl'
import { Toaster } from 'react-hot-toast'

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobile, setMobile] = useState(false)
  const Icon = mobile ? FaTimes : SlMenu
  const [logs, setLogs] = useState(false)

  const handleLogout = () => {
    setLogs(!logs)
  }

  const handleLogs = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setLogs(!logs)
  }

  return (
    <div>
      {/* {logs && <Logout closeView={() => setLogs(!logs)} /> } */}
      <div className="">
        <div className="flex items-center">
          <div className={`h-screen ${mobile ? 'w-[30vw]' : 'w-0'} border-r transition-all lg:w-[20%] overflow-y-auto`}>
            <AdminSidebar handleLogs={handleLogs} />
          </div>
          <div className={`h-screen ${mobile ? 'w-[70vw]' : 'w-full'} ml-auto transition-all overflow-x-hidden lg:w-[90%]`}>
            <div className="h-[10vh] border-b">
              <div className="flex items-center justify-between pt-5 w-11/12 mx-auto">
                <div>
                  <Icon onClick={() => setMobile(!mobile)} className='cursor-pointer lg:hidden text-navy font-bold text-xl' />
                </div>
                <div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={handleLogout}
                      className="bg-light hover:scale-110 transition-all rounded-full text-white shadow-xl py-1.5 px-4 gap-2 text-sm capitalize font-semibold flex items-center"
                    >
                      <SlPower /> logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[90vh] overflow-y-auto scrollsdown">
              {children}
            </div>
          </div>
        </div>
      </div>

      <Toaster position='top-center' />
    </div>
  )
}

export default AdminLayout
