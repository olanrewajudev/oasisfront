import React from "react";
import { SlExclamation } from "react-icons/sl";
import ModalLayout from "../../../Component/Admin/ModalLayout";

interface ConfirmPriceProps {
    closeView: () => void;
    confirmSubmission: () => void;
    text: string;
}

const ConfirmPrice: React.FC<ConfirmPriceProps> = ({ closeView, confirmSubmission, text }) => {
    const handleProceed = () => {
        confirmSubmission();
        window.location.reload();
    };

    return (
        <ModalLayout closeView={closeView}>
            <div className="flex items-center justify-center flex-col">
                <div className="text-7xl my-5 text-orange-400">
                    <SlExclamation />
                </div>
                <div className="text-slate-600 font-semibold text-2xl capitalize">
                    Confirm request
                </div>
                <div className="text-slate-600">{text}</div>
                <div className="mt-10 mb-5">
                    <button
                        onClick={handleProceed}
                        className="bg-slate-700 text-navy py-3 px-10 rounded-full capitalize font-semibold"
                    >
                        proceed
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
};

export default ConfirmPrice;
