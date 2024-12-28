import React, { useState } from "react";
import { Apis, AuthPosturl } from "../../../Component/Utils/Api";
import ModalLayout from "../../../Component/Admin/ModalLayout";
import { ToastAlert } from "../../../Component/Utils/Utils";
import { Toaster } from "react-hot-toast";

interface Props {
    closeView: () => void;
    singles: {
        id?: number;
        title?: string;
        image?: string;
    };
    resendSignal: () => void;
}

const CategoryModal: React.FC<Props> = ({ closeView, singles, resendSignal }) => {
    const [, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string | undefined>(singles.id ? singles.title : '');

    const handleSubmission = async () => {
        try {
            if (!title) return ToastAlert('Title of category is required!');
            const data = new FormData();
            data.append('title', title);
            if (singles?.id) {
                data.append('id', String(singles.id));
            }
            setLoading(true);
            const res = singles.id
                ? await AuthPosturl(Apis.category.update_category, data)
                : await AuthPosturl(Apis.category.add_category, data);
            setLoading(false);
            if (res.status === 200) {
                setTitle('');
                closeView();
                resendSignal();
                ToastAlert(res.msg);
            } else {
                ToastAlert(res.msg);
            }
        } catch (error) {
            setLoading(false);
            ToastAlert(String(error));
        }
    };


    return (
        <ModalLayout closeView={closeView}>
            <div className="">
                <div className="">
                    <div className="text-xl rounded-lg shadow-xl mb-5 bg-light text-white p-3">New Category</div>
                    <div className="mb-3">
                        <div className="text-sm uppercase font-semibold">Title of Category</div>
                        <input autoFocus={true} value={title} onChange={e => setTitle(e.target.value)} type="text" className="input" />
                    </div>
                    
                    <div className="w-fit ml-auto mt-8">
                        <button onClick={handleSubmission} className="bg-light py-2 px-8 uppercase text-sm rounded-lg text-white">Save</button>
                    </div>
                </div>
                <Toaster position="top-center" />
            </div>
        </ModalLayout>
    );
};

export default CategoryModal;
