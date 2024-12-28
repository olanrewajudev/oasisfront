import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { AuthGeturl, Apis, AuthPosturl } from '../../../Component/Utils/Api';
import { ErrorAlert, ToastAlert } from '../../../Component/Utils/Utils';
import JoditEditor from 'jodit-react';
import Load from '../../../Component/Utils/Load';

interface ServiceFormProps {
    Service?: { id?: number };
}

interface FormState {
    title: string;
    category: string;
    maincategory: string;
    discountprice: string;
    currentprice: string;
    discount: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ Service }) => {
    const editor = useRef<any>(null);
    const [content, setContent] = useState<string>('');
    const formdata = new FormData();
    const [items, setItems] = useState<Array<{ id: number; title: string }>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>('');
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setHours(value);
        }
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setMinutes(value);
        }
    };

    const formatDuration = (): string => {
        return `${hours}hr ${minutes}min`;
    };

    const [forms, setForms] = useState<FormState>({
        title: '',
        category: '',
        maincategory: '',
        discountprice: '',
        currentprice: '',
        discount: '',
    });


    const handleForms = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForms({ ...forms, [e.target.name]: e.target.value });
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

    const handleMainCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setForms({
            ...forms,
            maincategory: e.target.value,
        });
    };


    useEffect(() => {
        fetchAllCategories();
    }, []);

    const loadSubmission = async (e: FormEvent) => {
        try {
            e.preventDefault();
            if (!forms.title) return ErrorAlert('Service title is required!');
            if (!forms.maincategory) return ErrorAlert('Service category is required!');
            if (!forms.currentprice) return ErrorAlert('Service current price is required!');
            if (!content) return ErrorAlert('Service contents required');
            if (!hours && !minutes) return ErrorAlert('Service duration required');

            formdata.append('title', forms.title);
            formdata.append('category', forms.category || '');
            formdata.append('maincategory', forms.maincategory);
            formdata.append('currentprice', forms.currentprice);
            formdata.append('discountprice', forms.discountprice);
            formdata.append('discount', forms.discount);
            formdata.append('content', content);
            formdata.append('duration', formatDuration());

            setLoading(true);
            const res = !Service?.id
                ? await AuthPosturl(Apis.services.new_service, formdata)
                : await AuthPosturl(Apis.services.update_service, formdata);

            setTimeout(() => {
                setLoading(false);
                window.location.reload()

            }, 2000);
            if (res.status === 200) {
                setForms({
                    title: '',
                    category: '',
                    discountprice: '',
                    currentprice: '',
                    maincategory: '',
                    discount: '',
                });
                ToastAlert(res.msg);
                setContent('');
                setHours(0);
                setMinutes(0);
            } else {
                ErrorAlert(res.msg);
            }
        } catch (error) {
            setLoading(false);
            ErrorAlert(`Something isn't right somewhere`);
        }
    };

    const handleDiscounting = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const val = (e.target as HTMLInputElement).value;
        setTimeout(() => {
            setErr('');
        }, 4000);

        if (!forms.currentprice) return setErr('dp');

        if (val.length > 0) {
            const summed = ((Number(forms.currentprice) - Number(val)) / Number(forms.currentprice)) * 100;
            if (summed < 0) return setErr('dp');
            setForms({ ...forms, discountprice: val });
            setForms({ ...forms, discount: summed.toFixed(2) });
        } else {
            setForms({ ...forms, discount: '', discountprice: '' });
        }
    };

    const handlePercentDiscount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const val = (e.target as HTMLInputElement).value;
        setTimeout(() => {
            setErr('');
        }, 5000);

        if (!forms.currentprice) return setErr('pd');

        if (val.length > 0) {
            const summed = Number(forms.currentprice) - (Number(forms.currentprice) * Number(val)) / 100;
            if (summed < 0) return setErr('pd');
            setForms({ ...forms, discount: val, discountprice: summed.toFixed(2) });
        } else {
            setForms({ ...forms, discount: '', discountprice: '' });
        }
    };

    return (
        <div>
            {loading && <Load />}
            <div className='overflow-hidden'>
                <div className="px-5 w-11/12 my-16 text-navy bg-white py-16 shadow-2xl border rounded-lg mx-auto">
                    <form action="" onSubmit={loadSubmission}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5">
                            <div>
                                <div>
                                    <div className="text-navy">
                                        <div className=" text-sm font-bold mb-1 uppercase">Service title</div>
                                        <input name="title" value={forms.title} onChange={handleForms} type="text" className="input" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="text-navy uppercase text-sm mb-1 font-bold">Category</div>
                                    <select name="maincategory" onChange={handleMainCategory} className="input uppercase">
                                        <option value="">--Select--</option>
                                        {items.map((item, i) => (
                                            <option key={i} value={item.id}>{item.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5">
                            <div>
                                <div className="text-navy text-sm font-bold uppercase mb-1">Original price</div>
                                <input name="currentprice" value={forms.currentprice} onChange={handleForms} type="number" className="input" />
                            </div>
                            <div>
                                <div className="text-navy text-sm font-bold uppercase">Discount Percentage (Optional)</div>
                                <input onKeyUp={handlePercentDiscount} name="discount" value={forms.discount} onChange={handleForms} type="text" className="input" />
                            </div>

                        </div>

                        <div className="">
                            <div className=" mb-1 text-navy text-sm font-bold uppercase">Duration</div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5'>
                                <div className="">
                                    <input
                                        type="number"
                                        value={hours}
                                        onChange={handleHoursChange}
                                        min={0}
                                        max={24}
                                        step={1}
                                        className='input'
                                        placeholder={`hrs`}
                                    />
                                </div>
                                <div className="">
                                    <input
                                        type="number"
                                        value={minutes}
                                        onChange={handleMinutesChange}
                                        min={0}
                                        max={59}
                                        step={1}
                                        className='input'
                                        placeholder={`min`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5">
                            <div>
                                <div className="text-navy text-sm font-bold uppercase mb-1">Discounted price (optional)</div>
                                <input maxLength={forms.currentprice?.length ?? 0} onKeyUp={handleDiscounting} name="discountprice" value={forms.discountprice} onChange={handleForms} type="number" className={`input border ${err === 'dp' ? '!border-red-600' : '!border-slate-200'}`} />
                            </div>
                            <div className='input'>Total Duration: {formatDuration()}</div>
                        </div>
                        <div className="mb-3">
                            <div className="uppercase text-sm font-bold mb-4">Service Description</div>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                onChange={(newContent) => setContent(newContent)}
                            />
                        </div>
                        <div className="mt-5 flex items-end">
                            <button
                                className="bg-light text-navy font-bold py-2 px-4 rounded"
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

export default ServiceForm;
