import { useState, useCallback, useEffect, FormEvent } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "../../../Component/Admin/AdminLayout";
import { AuthGeturl, Apis, AuthPosturl } from "../../../Component/Utils/Api";
import { ErrorAlert, ToastAlert } from "../../../Component/Utils/Utils";
import Load from "../../../Component/Utils/Load";
import EditSinglePrice from "./EditSinglePrice";

interface PriceItem {
  id: string;
}

const EditSection: React.FC = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [loads, setLoads] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [prics, setPrics] = useState<string[]>([]);
  const [saved, ] = useState<string>("no");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fetchAllPrices = useCallback(async () => {
    const res = await AuthGeturl(Apis.prices.all_price);
    const secRes = await AuthGeturl(`${Apis.prices.single_section}/${id}`);
    if (res.status === 200) {
      setLoading(false);
      setTitle(secRes.sec?.title || "");
      setPrices(res.msg);
      setPrics(secRes.msg);
    }
  }, [id]);

  const sendAds = (priceId: string) => {
    const findPrice = prics.find((item) => item === priceId);
    if (!findPrice) {
      setPrics([...prics, priceId]);
    } else {
      const filter = prics.filter((item) => item !== priceId);
      setPrics(filter);
    }
  };

  useEffect(() => {
    fetchAllPrices();
  }, [fetchAllPrices]);

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) return ErrorAlert("Title of section is required");
    
    const formdata = {
      title,
      prices: prics,
      id,
    };
    
    setLoads(true);
    const res = await AuthPosturl(Apis.prices.update_section, formdata);
    setLoads(false);
    
    if (res.status === 200) {
      ToastAlert(res.msg);
      setTimeout(() => {
        navigate("/auth/admin/section");
      }, 1500);
    } else {
      return ErrorAlert(res.msg);
    }
  };

  return (
    <AdminLayout>
      {loads && <Load title="Creating Price Section..." />}
      <div>
        <div className="my-5 w-11/12 mx-auto pl-3">
          <Link to="/auth/admin/section" className="text-2xl font-semibold text-navy flex items-center gap-3">
            <FaArrowLeft /> Back
          </Link>
        </div>
        <form onSubmit={handleSubmission} className="bg-white px-3 py-6">
          <div className="mb-3 w-fit ml-auto">
            <button className="bg-light text-sm py-3 px-5 font-semibold rounded-full shadow-xl text-white capitalize">
              update section
            </button>
          </div>
          <div className="mb-3">
            <div className="text-sm">Enter Section Title</div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input" />
          </div>
          <div className="mb-2 mt-6">
            <div className="font-semibold text-zinc-600 mb-5">Add prices to section</div>
            {prices.length > 0 &&
              prices.map((item, i) => (
                <EditSinglePrice saved={saved} sendAds={sendAds} key={i} prics={prics} prices={item} />
              ))}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditSection;
