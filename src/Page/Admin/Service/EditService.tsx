import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ErrorAlert, ToastAlert } from '../../../Component/Utils/Utils';
import { Apis, AuthGeturl, AuthPosturl } from '../../../Component/Utils/Api';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../../Component/Admin/AdminLayout';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface FormData {
  append: (name: string, value: string) => void;
}

interface Service {
  id: string;
  content: string;
}

interface Item {
  id: string;
  title: string;
}

const EditService: React.FC = () => {
  const { id } = useParams();
  const editor = useRef(null);
  const [, setService] = useState<Service>({ id: '', content: '' });
  const [content, setContent] = useState<string>('');
  const formdata = new FormData() as FormData;
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [loadContent, setLoadContent] = useState<boolean>(true);

  const [forms, setForms] = useState({
    title: '',
    category: '',
    discountprice: '',
    currentprice: '',
    discount: '',
    duration: '',
    maincategory: ''
  });
  const serviceId = id || '';

  const fetchService = useCallback(async () => {
    const res = await AuthGeturl(`${Apis.services.fetch_associates}/${id}`);
    if (res.status === 200) {
      setItems(res.allcarts);
      const servi = res.service;
      setForms({
        title: servi?.id ? servi.title : '',
        category: servi?.id ? servi?.category : '',
        maincategory: servi?.id ? servi.maincategory : '',
        discountprice: servi?.id ? servi.discountprice : '',
        currentprice: servi?.id ? servi.currentprice : '',
        discount: servi?.id ? servi.discount : '',
        duration: servi?.id ? servi.duration : '',
      });
      setContent(servi?.id ? servi.content : '');
      setService(res.service);
      setLoadContent(false);
      const [hrs, mins] = parseDuration(servi?.duration || '');
      setHours(hrs);
      setMinutes(mins);
    }
  }, [id]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);


  const handleMainCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setForms({
      ...forms,
      maincategory: e.target.value,
    });
  };


  const handleForms = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setHours(value);
      updateDuration(value, minutes);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMinutes(value);
      updateDuration(hours, value);
    }
  };

  const updateDuration = (hrs: number, mins: number) => {
    const duration = `${hrs}hr ${mins}min`;
    setForms((prevForms) => ({ ...prevForms, duration }));
  };

  const parseDuration = (duration: string): [number, number] => {
    const [hrs, mins] = duration.split(' ').map((part) => parseInt(part));
    return [hrs || 0, mins || 0];
  };

  const formatDuration = () => {
    return `${hours}hr ${minutes}min`;
  };

  const loadSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!forms.title) return ErrorAlert('Service title is required!');
      if (!forms.maincategory) return ErrorAlert('Service category is required!');
      if (!forms.currentprice) return ErrorAlert('Service current price is required!');
      if (!content) return ErrorAlert('Service contents required');
      if (!hours && !minutes) return ErrorAlert('Service duration required');

      formdata.append('title', forms.title);
      formdata.append('category', forms.category);
      formdata.append('maincategory', forms.maincategory);
      formdata.append('currentprice', forms.currentprice);
      formdata.append('discountprice', forms.discountprice);
      formdata.append('discount', forms.discount);
      formdata.append('content', content);
      formdata.append('serviceid', serviceId);
      formdata.append('duration', forms.duration);

      setLoading(true);
      const res = await AuthPosturl(Apis.services.update_service, formdata);
      setLoading(false)
      if (res.status === 200) {
        ToastAlert(res.msg);
        window.location.href = ('/auth/admin/price')

      } else {
        setLoading(false);
        ToastAlert(res.msg);
      }
    } catch (error) {
      ErrorAlert(error as string);
    }
  };

  const handleDiscounting = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setTimeout(() => {
      setErr('');
    }, 4000);

    if (!forms.currentprice) {
      setErr('dp');
      return;
    }

    if (val.length > 0) {
      const summed = ((Number(forms.currentprice) - Number(val)) / Number(forms.currentprice)) * 100;
      if (summed < 0) {
        setErr('dp');
        return;
      }
      setForms({ ...forms, discountprice: val, discount: summed.toFixed(2) });
    } else {
      setForms({ ...forms, discount: '', discountprice: '' });
    }
  };

  const handlePercentDiscount = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setTimeout(() => {
      setErr('');
    }, 5000);

    if (!forms.currentprice) {
      setErr('pd');
      return;
    }

    if (val.length > 0) {
      const summed = Number(forms.currentprice) - (Number(forms.currentprice) * Number(val)) / 100;
      if (summed < 0) {
        setErr('pd');
        return;
      }
      setForms({ ...forms, discount: val, discountprice: summed.toFixed(2) });
    } else {
      setForms({ ...forms, discount: '', discountprice: '' });
    }
  };

  return (
    <AdminLayout>
      <div className='m-10'>
        <Link to='/auth/admin/service' className="text-2xl font-semibold text-navy flex items-center gap-3">
          <FaArrowLeft /> Back
        </Link>
      </div>
      <div className="px-5 w-11/12 text-navy bg-white py-16 shadow-2xl border rounded-lg mx-auto">
        {loadContent}
        {!loadContent && (
          <form action="" onSubmit={loadSubmission}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5">
              <div>
                <div>
                  <div className="text-navy">
                    <div className="text-sm font-bold mb-1 uppercase">Service title</div>
                    <input name="title" value={forms.title} onChange={handleForms} type="text" className="input" />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-slate-600 uppercase  text-sm">category</div>
                <select
                  name="maincategory"
                  value={forms.maincategory}
                  onChange={(event) => handleMainCategory(event)}
                  className="input"
                >
                  <option value="">--Select--</option>
                  {items.map((item, i) => (
                    <option key={i} value={item.id}>{item.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5">
              <div>
                <div className="text-navy text-sm font-bold uppercase mb-1">Original price</div>
                <input name="currentprice" value={forms.currentprice} onChange={handleForms} type="number" className="input" />
              </div>
              <div>
                <div className="text-navy text-sm font-bold uppercase">Discount Percentage (Optional)</div>
                <input onKeyUp={handlePercentDiscount} name="discount" value={forms.discount} onChange={handleForms} type="number" className="input" />
                {err === 'pd' && <div className="text-xs text-danger mt-2">Original price is required to perform percentage calculation</div>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5">
              <div>
                <div className="text-navy text-sm font-bold uppercase">Discount Price (Optional)</div>
                <input onKeyUp={handleDiscounting} name="discountprice" value={forms.discountprice} onChange={handleForms} type="number" className="input" />
                {err === 'dp' && <div className="text-xs text-danger mt-2">Original price is required to perform discount calculation</div>}
              </div>
              <div>
                <div className="text-navy text-sm font-bold uppercase">Total Duration</div>
                <div className="flex items-center gap-2">
                  <input name="hours" value={hours} onChange={handleHoursChange} type="number" className="input w-20" placeholder="Hr" />
                  <input name="minutes" value={minutes} onChange={handleMinutesChange} type="number" className="input w-20" placeholder="Min" />
                </div>
                <div className='input mt-2'>Total Duration: {formatDuration()}</div>
              </div>
            </div>

            <div className="w-full mb-5 text-navy">
              <div className="text-sm font-bold mb-1 uppercase">Service Description</div>
              <div className="mb-5">
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={newContent => setContent(newContent)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-10 gap-5">
              <div>
                <button disabled={loading} type="submit" className="bg-light text-navy p-3 font-semibold">
                  {loading ? 'Updating...' : 'Update Service'}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </AdminLayout>
  );
};

export default EditService;