import React, { useCallback, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dispatchAdmin } from '../App/reducer';
import Cookies from 'js-cookie';
import { Apis, AuthGeturl } from '../Component/Utils/Api';
import { ErrorAlert } from '../Component/Utils/Utils';

interface AdminsProps {
  children: ReactNode;
}

const Admins: React.FC<AdminsProps> = ({ children }) => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    const res = await AuthGeturl(Apis.users.get_account)
    try {
      if (res.status === 200) {
        if (res.msg.role === 'admin') {
          setAllowed(true)
          dispatch(dispatchAdmin(res.msg))
        } else {
          Cookies.remove('oasis')
        }
      } else {
        navigate('/login')
        console.log('there is error')
      }
    } catch (error) {
      ErrorAlert(`${error}`)
      console.log(`${error}`)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (allowed) return children
}

export default Admins;
