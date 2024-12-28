import React, { useCallback, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { dispatchAdmin, dispatchCategory, dispatchInfo,} from '../App/reducer';
import { ErrorAlert } from '../Component/Utils/Utils';
import { Apis, Geturl } from '../Component/Utils/Api';

interface UserProps {
  children: ReactNode;
}

const User: React.FC<UserProps> = ({ children }) => {
  const dispatch = useDispatch();

  const fetchAdminContact = useCallback(async () => {
    try {
      const res = await Geturl(Apis.users.super);
      const resimg = await Geturl(Apis.users.images);
      if (res.status === 200) {

        dispatch(dispatchInfo(resimg.info));
        dispatch(dispatchCategory(resimg.categories));
        dispatch(dispatchAdmin(res.msg));
      } else {
        ErrorAlert(res.msg);
      }
    } catch (error) {
      ErrorAlert('An error occurred while fetching admin contact.');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAdminContact();
  }, [fetchAdminContact]);

  return <div>{children}</div>;
};

export default User;
