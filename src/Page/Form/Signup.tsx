import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SlUser } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { Posturl, Apis } from '../../Component/Utils/Api';
import { ToastAlert } from '../../Component/Utils/Utils';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { Routes } from '../../Private/Routes';
import { Toaster } from 'react-hot-toast';
import Header from '../../Component/User/Header';

interface DecodedToken {
  role: string;
}

const Signup: React.FC = () => {
  const [, setLoading] = useState(false);
  const [pass1, setPass1] = useState(false);
  const [pass2, setPass2] = useState(false);
  const Icon1 = pass1 ? FaEye : FaEyeSlash;
  const Icon2 = pass2 ? FaEye : FaEyeSlash;
  const [forms, setForms] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const handleForms = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();
    if (!forms.firstname) return ToastAlert('firstname is required');
    if (!forms.lastname) return ToastAlert('lastname is required');
    if (!forms.email) return ToastAlert('email is required');
    if (!forms.phone) return ToastAlert('phone is required');
    if (!forms.password) return ToastAlert('password is required');
    if (!forms.confirm_password) return ToastAlert('confirming password is required');
    if (forms.confirm_password !== forms.password) return ToastAlert('password(s) do not match');
    const formdata = { ...forms };

    setLoading(true);
    try {
      const res = await Posturl(Apis.users.register_account, formdata);
      setLoading(false);

      if (res.status === 200) {
        const token = res.token;
        Cookies.set('oasis', token);
        const decoded = decodeToken<DecodedToken>(token);
        const findRole = Routes.find((item) => item.role === decoded?.role);
        if (decoded?.role !== 'admin') {
          ToastAlert(`You can now continue to purchase your order`);
          console.log(`You can now continue to purchase your order`);
        } else {
          ToastAlert("Welcome Admin, Redirecting you now to your dashboard");
          console.log("Welcome Admin, Redirecting you now to your dashboard");
        }
        if (findRole) {
          setTimeout(() => {
            window.location.href = `${findRole.url}`;
          }, 2000);
        }
      } else {
        ToastAlert(res.msg);
      }
    } catch (error) {
      setLoading(false);
      ToastAlert(`${error}`);
    }
  };

  return (
    <>
      <Header />

      <div className="w-11/12 mx-auto max-w-xl text-white font-semibold py-20">
        <div className="border">
          <div className="text-2xl p-3 text-navy capitalize font-semibold flex items-center gap-3">
            <SlUser /> create admin access
          </div>
          <div className="cust"></div>
        </div>
        <form onSubmit={handleSubmission} className="px-4 bg-default py-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="uppercase text-sm">firstname</div>
              <input name="firstname" value={forms.firstname} onChange={handleForms} type="text" className="input" />
            </div>
            <div>
              <div className="uppercase text-sm">lastname</div>
              <input name="lastname" value={forms.lastname} onChange={handleForms} type="text" className="input" />
            </div>
          </div>
          <div className="mb-4">
            <div className="uppercase text-sm">email address</div>
            <input name="email" value={forms.email} onChange={handleForms} type="text" className="input" />
          </div>
          <div className="mb-4">
            <div className="uppercase text-sm">Phone number</div>
            <input name="phone" value={forms.phone} onChange={handleForms} type="text" className="input" />
          </div>

          <div className="">
            <div className="mb-4 relative">
              <div onClick={() => setPass1(!pass1)} className="absolute top-8 right-4 cursor-pointer text-2xl text-slate-500">
                <Icon1 />
              </div>
              <div className="uppercase text-sm">password</div>
              <input name="password" value={forms.password} onChange={handleForms} type={pass1 ? 'text' : 'password'} className="input" />
            </div>

            <div className="mb-4 relative">
              <div onClick={() => setPass2(!pass2)} className="absolute top-8 right-4 cursor-pointer text-2xl text-slate-500">
                <Icon2 />
              </div>
              <div className="uppercase text-sm">confirm password</div>
              <input name="confirm_password" value={forms.confirm_password} onChange={handleForms} type={pass2 ? 'text' : 'password'} className="input" />
            </div>

          </div>


          <div className="w-3/4 mt-10 mx-auto">
            <button className="bg-white text-navy py-3 rounded-lg w-full text-lg shadow-xl capitalize">create access</button>
          </div>
          <div className="mt-5">
            <div className="text-center text-slate-600">
              Already have an access? <Link to='/login' className='text-white'>Renew Now</Link>
            </div>
          </div>
        </form>
      </div>
      <Toaster position='top-center' />
    </>
  );
};

export default Signup;
