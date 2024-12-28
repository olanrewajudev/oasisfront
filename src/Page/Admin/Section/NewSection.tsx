import { useState, useCallback, useEffect, FormEvent, useRef, ChangeEvent } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import {  Link } from "react-router-dom";
import AdminLayout from "../../../Component/Admin/AdminLayout";
import { AuthGeturl, Apis, AuthPosturl } from "../../../Component/Utils/Api";
import { ErrorAlert, ToastAlert } from "../../../Component/Utils/Utils";
import Load from "../../../Component/Utils/Load";
import SingleSectionPrice from "./SingleSectionPrice";

interface PriceItem {
  id: string;
}

interface ImageState {
  main: File | null;
  preview: string | ArrayBuffer | null;
}

const NewSection: React.FC = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [saved, setSaved] = useState<string>("no");
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

  const fetchAllPrices = useCallback(async () => {
    try {
      const res = await AuthGeturl(Apis.prices.all_price);
      if (res.status === 200) {
        setPrices(res.msg);
      }
    } catch (error) {
      ErrorAlert("Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  }, []);

  const togglePriceSelection = (id: string) => {
    setSelectedPrices((prevSelectedPrices) => {
      return prevSelectedPrices.includes(id)
        ? prevSelectedPrices.filter((item) => item !== id)
        : [...prevSelectedPrices, id];
    });
  };

  useEffect(() => {
    fetchAllPrices();
  }, [fetchAllPrices]);

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) return ErrorAlert("Title of section is required");
    if (!image.main) return ErrorAlert("Image is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("prices", JSON.stringify(selectedPrices));
    formData.append("image", image.main);

    setIsSubmitting(true);

    try {
      const res = await AuthPosturl(Apis.prices.add_section, formData);
      if (res.status === 200) {
        setSaved("yes");
        ToastAlert(res.msg);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        ErrorAlert(res.msg);
      }
    } catch (error) {
      ErrorAlert("Failed to create section");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      {isSubmitting && <Load title="Creating Price Section..." />}
      <div>
        <div className="my-5 w-11/12 mx-auto pl-3">
          <Link to="/auth/admin/section" className="text-2xl font-semibold text-navy flex items-center gap-3">
            <FaArrowLeft /> Back
          </Link>
        </div>
        <form onSubmit={handleSubmission} className="bg-white px-3 py-6">
          <div className="mb-3 w-fit ml-auto">
            <button type="submit" disabled={isSubmitting} className="bg-light text-sm py-3 px-5 font-semibold rounded-full shadow-xl text-white capitalize">
              {isSubmitting ? "Creating..." : "Create Section"}
            </button>
          </div>
          <div className="mb-3">
            <div className="text-sm">Enter Section Title</div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input" />
          </div>
          <div className="mb-10 text-navy">
            <div className="capitalize font-bold mb-4">Upload Image</div>
            <label>
              {image.preview === null ? (
                <div className="w-full h-[25rem] rounded-lg bg-slate-200 cursor-pointer mx-auto flex items-center justify-center text-navy">
                  <FaPlus />
                </div>
              ) : (
                <img src={image.preview as string} alt="" className="w-full h-[20rem] mx-auto border rounded-lg object-cover" />
              )}
              <input onChange={handleUpload} type="file" hidden ref={imgRef} />
            </label>
          </div>
          <div className="mb-2 mt-6">
            <div className="font-semibold text-zinc-600 mb-5">Add prices to section</div>
            {prices.length > 0 &&
              prices.map((item) => (
                <SingleSectionPrice
                  saved={saved}
                  sendAds={togglePriceSelection}
                  key={item.id}
                  price={item}
                />
              ))}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewSection;
