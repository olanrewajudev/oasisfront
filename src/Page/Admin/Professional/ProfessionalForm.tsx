import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Apis, AuthPosturl } from '../../../Component/Utils/Api';
import { ErrorAlert, ToastAlert } from '../../../Component/Utils/Utils';
import Load from '../../../Component/Utils/Load';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProfessionalFormProps {
    professional?: { id?: number };
}

interface FormState {
    fullname: string;
    role: string;
}

interface ImageState {
    main: File | null;
    preview: string | ArrayBuffer | null;
}

const ProfessionalForm: React.FC<ProfessionalFormProps> = ({ professional }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [forms, setForms] = useState<FormState>({
        fullname: '',
        role: '',
    });

    const imgRef = useRef<HTMLInputElement | null>(null);

    const [image, setImage] = useState<ImageState>({
        main: null,
        preview: null,
    });

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage({
                    main: file,
                    preview: reader.result,
                });
            };
        }
    };

    const handleForms = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForms({ ...forms, [e.target.name]: e.target.value });
    };

    const loadSubmission = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!forms.fullname) return ErrorAlert('Professional fullname is required!');
            if (!forms.role) return ErrorAlert('Professional role is required!');

            const formdata = new FormData();
            formdata.append('fullname', forms.fullname);
            formdata.append('role', forms.role);
            if (image.main) {
                formdata.append('image', image.main);
            }

            setLoading(true);
            const res = !professional?.id
                ? await AuthPosturl(Apis.professionals.new_professional, formdata)
                : await AuthPosturl(Apis.professionals.update_professional, formdata);

            if (res.status === 200) {
                setForms({
                    fullname: '',
                    role: '',
                });
                setImage({ main: null, preview: null });
                ToastAlert(res.msg);
            } else {
                ErrorAlert(res.msg);
            }
        } catch (error) {
            ErrorAlert(`Something isn't right somewhere`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <Load />}
            <div className="my-8 w-11/12 mx-auto pl-3">
          <Link to="/auth/admin/professional" className="text-2xl font-semibold text-navy flex items-center gap-3">
            <FaArrowLeft /> Back
          </Link>
        </div>
            <div className="overflow-hidden">
                <div className="px-5 w-11/12 my- text-navy bg-white py-16 shadow-2xl border rounded-lg mx-auto">
                    <form action="" onSubmit={loadSubmission}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5">
                            <div>
                                <div className="text-navy">
                                    <div className="text-sm font-bold mb-1 uppercase">Professional Fullname</div>
                                    <input name="fullname" value={forms.fullname} onChange={handleForms} type="text" className="input" />
                                </div>
                            </div>
                            <div>
                                <div className="text-navy">
                                    <div className="text-sm font-bold mb-1 uppercase">Professional Role</div>
                                    <input name="role" value={forms.role} onChange={handleForms} type="text" className="input" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-10 text-navy">
                            <div className="capitalize font-bold mb-4">Upload Image</div>
                            <label>
                                {image.preview === null ? (
                                    <div className="w-full h-[25rem] rounded-lg bg-slate-200 cursor-pointer mx-auto flex items-center justify-center text-navy">
                                        <FaPlus />
                                    </div>
                                ) : (
                                    <img src={image.preview as string} alt="" className="w-full h-[25rem] mx-auto border rounded-lg object-cover" />
                                )}
                                <input onChange={handleUpload} type="file" hidden ref={imgRef} />
                            </label>
                        </div>
                        <div className="mt-5 flex items-end">
                            <button
                                className="bg-light text-white font-bold py-2 px-4 rounded"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalForm;
