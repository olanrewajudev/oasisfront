import { FC } from 'react';
import ModalLayout from '../../../Component/Admin/ModalLayout';

interface DeleteProfessionalProps {
    closeView: () => void;
    confirmAction: () => void;
}

const DeleteProfessional: FC<DeleteProfessionalProps> = ({ closeView, confirmAction }) => {
    return (
        <ModalLayout closeView={closeView}>
        
            <div className="bg-slate-100 p-3 text-slate-600 font-semibold">Confirm Request</div>
            <div className="text-center w-4/5 my-6 mx-auto">Are you sure you want to <span className="text-light text-sm bg-red-400/20 rounded-lg py-1 font-semibold capitalize px-3">delete</span> this Professional</div>
            <div className="grid grid-cols-2 gap-3 w-11/12 mx-auto mb-5">
                <button onClick={confirmAction} className="bg-primary py-3 w-20 capitalize font-semibold ml-auto text-sm rounded-md text-white shadow-xl">proceed</button>
            </div>
        </ModalLayout>
    );
};

export default DeleteProfessional;
