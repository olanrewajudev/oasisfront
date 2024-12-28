import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SlPaperPlane } from "react-icons/sl";
import AdminLayout from "../../../Component/Admin/AdminLayout";
import { AuthPosturl, Apis, AuthGeturl } from "../../../Component/Utils/Api";
import { ErrorAlert, ToastAlert } from "../../../Component/Utils/Utils";
import JoditEditor from "jodit-react";
import Load from "../../../Component/Utils/Load";

interface FormsState {
    service: string;
    priceamount: string;
    maincategory: string;
}

interface ApiResponse {
    status: number;
    msg: string;
}



const NewPriceForm: React.FC = () => {
    const editor = useRef(null);
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [view, setView] = useState<boolean>(false);
    const [items, setItems] = useState<Array<{ id: number; title: string }>>([]);
    const [forms, setForms] = useState<FormsState>({
        service: '',
        priceamount: '',
        maincategory: ''
    });


    const handleForms = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        });
    };

    const fetchAllCategories = async () => {
        try {
            const res = await AuthGeturl(Apis.category.all_category);
            if (res.status === 200) {
                setItems(res.msg);
            } else {
                ErrorAlert(res.msg);
            }
        } catch (error) {
            ErrorAlert("Failed to fetch categories.");
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const handleSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!forms.service) return ErrorAlert('Price service is required');
        if (!forms.priceamount) return ErrorAlert('Price amount is required');
        if (!content) return ErrorAlert('Price content is required');
        if (!forms.maincategory) return ErrorAlert('Price category is required');
        setView(!view);

        const data = new FormData();
        data.append('service', forms.service);
        data.append('priceamount', forms.priceamount);
        data.append('maincategory', forms.maincategory);
        data.append('content', content);

        setLoading(true);
        setView(!view);
        const res = await AuthPosturl(Apis.prices.new_price, data) as ApiResponse;
        setLoading(false);
        if (res.status === 200) {
            ToastAlert(res.msg);
            setForms({
                service: '',
                priceamount: '',
                maincategory: ''
            });
            setContent('');
            window.location.reload();
        } else {
            ErrorAlert(res.msg);
        }
    };
    const handleMainCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setForms({
            ...forms,
            maincategory: e.target.value,
        });
    };

    return (
        <AdminLayout>
            {loading && <Load />}
            <div className="w-11/12 mx-auto my-10 bg-white p-5 rounded-lg text-navy font-medium shadow-2xl border">
                <div>
                    <form onSubmit={handleSubmission}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-8 gap-5">
                            <div className="">
                                <div>
                                    <div className="text-sm uppercase">Service</div>
                                    <input
                                        name="service"
                                        value={forms.service}
                                        onChange={handleForms}
                                        type="text"
                                        className="input"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <div className="text-sm uppercase">Price Amount</div>
                                    <input
                                        name="priceamount"
                                        value={forms.priceamount}
                                        onChange={handleForms}
                                        type="number"
                                        className="input"
                                    />
                                </div>
                            </div>
                        </div>

                            <div className="my-6">
                                <div className="uppercase text-sm">Category</div>
                                <select name="maincategory" onChange={handleMainCategory} className="input uppercase">
                                    <option value="">--Select--</option>
                                    {items.map((item, i) => (
                                        <option key={i} value={item.id}>{item.title}</option>
                                    ))}
                                </select>
                            </div>
                        <div className="mb-5">
                            <div className="text-sm uppercase">Enter Price Contents</div>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                onChange={newContent => setContent(newContent)}
                            />
                        </div>
                        <div className="w-fit ml-auto">
                            <button className="bg-light flex items-center gap-3 text-white font-semibold capitalize py-4 px-8 rounded-full shadow-xl">
                                Publish Price <SlPaperPlane />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NewPriceForm;
