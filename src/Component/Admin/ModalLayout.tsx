import React, { useEffect, useRef, ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalLayoutProps {
    closeView: () => void;
    children: ReactNode;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ closeView, children }) => {
    const togref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (togref.current && !togref.current.contains(e.target as Node)) {
                closeView();
            }
        };

        window.addEventListener('click', handleClickOutside, true);

        return () => {
            window.removeEventListener('click', handleClickOutside, true);
        };
    }, [closeView]);

    return (
        <div className='bg-black/60 fixed text-navy top-0 z-[99] left-0 w-full h-screen  flex items-center justify-center'>
            <div className='w-11/12 max-w-xl p-3 bg-white rounded-lg max-h-[90vh] overflow-y-auto overflow-x-hidden scrolls relative' ref={togref}>
                <div className="absolute top-5 right-5 w-fit ml-auto text-xl rounded-full cursor-pointer p-2" onClick={closeView}>
                    <FaTimes />
                </div>
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;
