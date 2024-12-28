import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ErrorAlert, ToastAlert } from '../../../Component/Utils/Utils';
import { Apis, AuthPosturl, Geturl } from '../../../Component/Utils/Api';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../../Component/Admin/AdminLayout';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';

interface ImageState {
  main: File | null;
  preview: string | ArrayBuffer | null;
}

const EditProfessional: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const [forms, setForms] = useState({
    fullname: '',
    role: '',
  });

  const [image, setImage] = useState<ImageState>({
    main: null,
    preview: null,
  });

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage({
          main: file,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(file); 
    }
  };

  const fetchProfessional = useCallback(async () => {
    try {
      const res = await Geturl(`${Apis.professionals.single_professional}/${id}`);
      if (res.status === 200) {
        const professional = res.msg;
        if (professional) {
          setForms({
            fullname: professional.fullname || '',
            role: professional.role || '',
          });
          if (professional.imageUrl) {
            setImage({
              main: null,
              preview: professional.imageUrl,
            });
          }
        } else {
          ErrorAlert('Professional details not found');
        }
      }
    } catch (error) {
      ErrorAlert('Error fetching professional details');
    }
  }, [id]);

  useEffect(() => {
    fetchProfessional();
  }, [fetchProfessional]);

  const handleForms = (e: ChangeEvent<HTMLInputElement>) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const loadSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!forms.fullname) return ErrorAlert('Professional fullname is required!');
      if (!forms.role) return ErrorAlert('Professional role is required!');

      const formData = new FormData();
      formData.append('fullname', forms.fullname);
      formData.append('role', forms.role);
      if (image.main) {
        formData.append('image', image.main);
      }

      setLoading(true);
      const res = await AuthPosturl(`${Apis.professionals.update_professional}/${id}`, formData);
      setLoading(false);

      if (res.status === 200) {
        ToastAlert(res.msg);
     
        window.location.href = ('/auth/admin/professional')
       
      } else {
        ToastAlert(res.msg);
      }
    } catch (error) {
      ErrorAlert('Something went wrong during submission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className='m-5'>
        <Link to='/auth/admin/professional' className="text-2xl font-semibold text-navy flex items-center gap-3">
          <FaArrowLeft /> Back
        </Link>
      </div>
      <div className="px-5 w-11/12 text-navy bg-white py-16 shadow-2xl border rounded-lg mx-auto">
        <form onSubmit={loadSubmission}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-5 gap-5">
            <div>
              <div className="text-navy">
                <label htmlFor="fullname" className="text-sm font-bold mb-1 uppercase">Professional Fullname</label>
                <input
                  id="fullname"
                  name="fullname"
                  value={forms.fullname}
                  onChange={handleForms}
                  type="text"
                  className="input"
                />
              </div>
            </div>
            <div>
              <div className="text-navy">
                <label htmlFor="role" className="text-sm font-bold mb-1 uppercase">Professional Role</label>
                <input
                  id="role"
                  name="role"
                  value={forms.role}
                  onChange={handleForms}
                  type="text"
                  className="input"
                />
              </div>
            </div>
          </div>
          <div className="mb-10 text-navy">
            <div className="capitalize font-bold mb-4">Upload Image</div>
            <label>
              {image.preview ? (
                <img
                  src={image.preview as string}
                  alt="Preview"
                  className="w-full h-[20rem] mx-auto border rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-[25rem] rounded-lg bg-slate-200 cursor-pointer mx-auto flex items-center justify-center text-navy">
                  <FaPlus />
                </div>
              )}
              <input onChange={handleUpload} type="file" hidden ref={imgRef} />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-10 gap-5">
            <div>
              <button disabled={loading} type="submit" className="bg-light text-navy p-3 font-semibold">
                {loading ? 'Updating...' : 'Update Professional'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProfessional;
