import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ErrorAlert, ToastAlert } from '../../Component/Utils/Utils';
import { Apis, Posturl } from '../../Component/Utils/Api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SlUser } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { Routes } from '../../Private/Routes';
import Header from '../../Component/User/Header';
import { Toaster } from 'react-hot-toast';

interface DecodedToken {
  role: string;
}

const Login: React.FC = () => {
  const [pass1, setPass1] = useState<boolean>(false);
  const Icon1 = pass1 ? FaEye : FaEyeSlash;
  const [forms, setForms] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [, setLoading] = useState(false);

  const handleForms = (e: ChangeEvent<HTMLInputElement>) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();
    if (!forms.email) return ErrorAlert('Email is required');
    if (!forms.password) return ErrorAlert('Password is required');
    const formdata = { ...forms };
    setLoading(true);
  
    try {
      const res = await Posturl(Apis.users.login_account, formdata);
      setLoading(false);
  
      if (res.status === 200) {
        const token = res.token;
        console.log('Received token:', token);

        if (!token || typeof token !== 'string') {
          ToastAlert('Invalid token received from server');
          console.error('Invalid token:', token);
          return;
        }
  
        Cookies.set('oasis', token);
  
        const decoded = decodeToken<DecodedToken>(token);
  
        if (decoded) {
          const findRole = Routes.find((item) => item.role === decoded.role);
  
          if (decoded.role !== 'admin') {
            ToastAlert('You can now continue to purchase your order');
            console.log('You can now continue to purchase your order');
          } else {
            ToastAlert('Welcome Admin, Redirecting you now to your dashboard');
            console.log('Welcome Admin, Redirecting you now to your dashboard');
          }
  
          if (findRole) {
            setTimeout(() => {
              window.location.href = findRole.url;
            }, 2000);
          }
        } else {
          ToastAlert('Failed to decode token');
          console.error('Decoded token is null');
        }
      } else {
        ToastAlert(res.msg);
        console.log(res.msg);
      }
    } catch (error) {
      setLoading(false);
      ToastAlert(`Error: ${error}`);
      console.log(`Error: ${error}`);
    }
  };
  
  

  return (
    <>
    <Header />
      <div className="w-11/12 mx-auto max-w-xl text-white font-semibold py-20">
        <div className="border text-black ">
          <div className="text-2xl p-3 capitalize font-semibold flex items-center gap-3">
            <SlUser /> renew access
          </div>
          <div className="cust"></div>
        </div>
        <form onSubmit={handleSubmission} className="px-4 bg-default py-8">
          <div className="mb-4">
            <div className="uppercase text-sm">email address</div>
            <input name="email" value={forms.email} onChange={handleForms} type="text" className="input" />
          </div>
          <div className="mb-4 relative">
            <div onClick={() => setPass1(!pass1)} className="absolute top-8 right-4 cursor-pointer text-2xl text-slate-500">
              <Icon1 />
            </div>
            <div className="uppercase text-sm">password</div>
            <input name="password" value={forms.password} onChange={handleForms} type={pass1 ? 'text' : 'password'} className="input" />
          </div>
          <div className="w-3/4 mx-auto">
            <button className="bg-white py-3 mt-10 rounded-lg text-black w-full text-lg shadow-xl capitalize">renew access</button>
          </div>
          <div className="mt-5">
            <div className="text-center text-slate-600">
              Don't have an access? <Link to='/signup' className='text-white'>Register Now</Link>
            </div>
          </div>
        </form>
      </div>
      
      <Toaster position='top-center'/> 
    </>
  );
};

export default Login;
