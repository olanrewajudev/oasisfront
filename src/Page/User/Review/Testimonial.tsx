import { FaGreaterThan } from "react-icons/fa";
import Layout from "../../../Component/User/Layout";
import ReviewForm from "./ReviewForm";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Geturl, Apis } from "../../../Component/Utils/Api";

const Testimonial = () => {
  const { id } = useParams();
  const [revs, setRevs] = useState([]);

  const fetchServiceReview = useCallback(async () => {
    const res = await Geturl(`${Apis.services.service_review}`);
    if (res.status === 200) {
      setRevs(res.msg);
    }
  }, [id]);

  useEffect(() => {
    fetchServiceReview();
  }, [fetchServiceReview]);

  return (
    <Layout>
      <div className="bg-light text-white py-32 lg:py-20">
        <div className="text-center text-5xl font-bold my-4">TESTIMONIAL</div>
        <div className="flex items-center justify-center text-center">
          <span className="font-semibold text-lg mx-2">HOME</span>
          <FaGreaterThan />
          <span className="underline font-semibold text-lg mx-2">TESTIMONIAL</span>
        </div>
      </div>
      <svg className="hidden lg:flex" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ac8968" fillOpacity="1" d="M0,160L21.8,176C43.6,192,87,224,131,229.3C174.5,235,218,213,262,197.3C305.5,181,349,171,393,176C436.4,181,480,203,524,229.3C567.3,256,611,288,655,288C698.2,288,742,256,785,213.3C829.1,171,873,117,916,85.3C960,53,1004,43,1047,64C1090.9,85,1135,139,1178,165.3C1221.8,192,1265,192,1309,192C1352.7,192,1396,192,1418,192L1440,192L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"></path>
      </svg>
      <div className="text-navy my-20">
        <div className="text-center">
          <b className="text-3xl">Join over 11,000 Happy Customers</b>
          <p>
            not only us to use but also clients when approving content and calendar planning. Any time we have made contact they have been quick to reply, and given added extra information to help.
          </p>
        </div>
        <div className="bg-light lg:w-[60%] my-20 text-center mx-auto lg:p-16 p-7 w-[95%] text-white rounded-2xl">
          <p className="text-xl font-medium">
            "Agorapulse has helped speed up and streamline our processes, allowing us to scale our company and take on more work. The ease of the user interface along with the features makes it easy for not only us to use but also clients when approving content and calendar planning. Any time we have made contact they have been quick to reply, and given added extra information to help. Overall we feel that they genuinely care about their clients and users."
          </p>
        </div>
        <div className="mb-32">
        </div>
      </div>
      <ReviewForm revs={revs} sendSignal={fetchServiceReview} />

    </Layout>
  );
};

export default Testimonial;
