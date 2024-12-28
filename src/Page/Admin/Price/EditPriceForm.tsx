import React, { useRef, useState, useCallback, useEffect, ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthGeturl, Apis, AuthPosturl } from "../../../Component/Utils/Api";
import { ErrorAlert, ToastAlert } from "../../../Component/Utils/Utils";
import AdminLayout from "../../../Component/Admin/AdminLayout";
import JoditEditor from "jodit-react";
import { SlPaperPlane } from "react-icons/sl";
import ConfirmPrice from "./ConfirmPrice";
import Load from "../../../Component/Utils/Load";
import { FaArrowLeft } from "react-icons/fa";

interface Price {
    id: string;
    service: string;
    priceamount: string;
    content: string;
    maincategory: string;
}
interface FormsState {
    service: string;
    priceamount: string;
    maincategory: string;
}
interface Item {
    id: string;
    title: string;
}

const EditPriceForm: React.FC = () => {
    const editor = useRef(null);
    const [items, setItems] = useState<Item[]>([]);
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [view, setView] = useState<boolean>(false);
    const [price, setPrice] = useState<Price | null>(null);
    const [loadContent, setLoadContent] = useState<boolean>(true);
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
    const fetchALlCategories = useCallback(async () => {
        const res = await AuthGeturl(Apis.category.all_category);
        if (res.status === 200) {
            return setItems(res.msg);
        }
    }, []);

    useEffect(() => {
        fetchALlCategories();
    }, [fetchALlCategories]);

    const fetchPrice = useCallback(async () => {
        const res = await AuthGeturl(`${Apis.prices.single_price}/${id}`);
        if (res.status === 200) {
            const item = res.msg;
            setForms({
                service: item.service,
                priceamount: item.priceamount,
                maincategory: item.maincategory,
            });
            setContent(item.content);
            setPrice(item);
            setLoadContent(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPrice();
    }, [fetchPrice]);

    const handleSubmission = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content) return ErrorAlert('Price content is required');
        if (!forms.service) return ErrorAlert('Price content is required');
        if (!forms.priceamount) return ErrorAlert('Price amount is required');
        if (!forms.maincategory) return ErrorAlert('Price category is required');
        setView(!view);
    };

    const confirmSubmission = async () => {
        const data = new FormData();
        data.append('content', content);
        data.append('service', forms.service);
        data.append('priceamount', forms.priceamount);
        data.append('maincategory', forms.maincategory);
        if (price) {
            data.append('id', price.id);
        }

        setLoading(true);
        setView(!view);
        const res = await AuthPosturl(Apis.prices.update_price, data);
        setLoading(false);
        if (res.status === 200) {
            ToastAlert(res.msg)
            window.location.href = ('/auth/admin/price')
        } else {
            return ErrorAlert(res.msg);
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
            {view && (
                <ConfirmPrice text='Please confirm your request to update this price post' confirmSubmission={confirmSubmission} closeView={() => setView(!view)}/>
            )}
            {loading && <Load />}
            <div className='m-10'>
            <Link to='/auth/admin/price' className="text-2xl font-semibold text-navy flex items-center gap-3">
              <FaArrowLeft /> Back
            </Link>
          </div>
            <div className="w-11/12 mx-auto my-10 bg-white p-3 border rounded-xl shadow-xl">
            
                <div>
                    {loadContent}
                    {!loadContent && (
                        <form onSubmit={handleSubmission}>
                            <div className="">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-5 gap-5">
                                    <div className="">
                                        <div className="text-sm uppercase">Price service</div>
                                        <input
                                            name="service"
                                            value={forms.service}
                                            onChange={handleForms}
                                            type="text"
                                            className="input"
                                        />
                                    </div>
                                    <div className="">
                                        <div className="text-sm uppercase">Price amount</div>
                                        <input
                                            name="priceamount"
                                            value={forms.priceamount}
                                            onChange={handleForms}
                                            type="number"
                                            className="input"
                                        />
                                    </div>
                                </div>
                                <div className="my-8">
                                    <div className="text-slate-600 uppercase  text-sm">category</div>
                                    <select
                                        name="maincategory"
                                        value={forms.maincategory}
                                        onChange={(event) => handleMainCategory(event)}
                                        className="input uppercase"
                                    >
                                        <option value="">--Select--</option>
                                        {items.map((item, i) => (
                                            <option key={i} value={item.id}>{item.title}</option>
                                        ))}
                                    </select>
                                </div>
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
                                <button className="bg-light font-semibold flex items-center gap-3 text-white capitalize py-4 px-8 rounded-full shadow-xl">
                                    Update Price <SlPaperPlane />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditPriceForm;
