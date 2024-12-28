import React, { useState } from "react";
import { AuthPosturl, Apis } from "../../../Component/Utils/Api";
import Load from "../../../Component/Utils/Load";
import { ErrorAlert } from "../../../Component/Utils/Utils";
import ModalLayout from "../../../Component/Admin/ModalLayout";

interface ConfirmDuplicateServiceProps {
  closeView: () => void;
  id: string;
  resendSignal: () => void;
}

const ConfirmDuplicateService: React.FC<ConfirmDuplicateServiceProps> = ({ closeView, id, resendSignal }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const confirmDup = async () => {
    const data = { id };
    setLoading(true);
    const res = await AuthPosturl(Apis.services.duplicate_service, data);
    setLoading(false);
    if (res.status === 200) {
      return resendSignal();
    } else {
      return ErrorAlert(res.msg);
    }
  };

  return (
    <>
      {loading && <Load title="Duplicating price, do hold on!..." />}
      <ModalLayout closeView={closeView}>
        <div className="bg-slate-100 p-3 text-slate-600 font-semibold">Confirm Duplication</div>
        <div className="text-center w-4/5 my-6 mx-auto">Are you sure you want to duplicate?</div>
        <div className="grid grid-cols-2 gap-3 w-11/12 mx-auto mb-5">
          <button onClick={closeView} className="bg-secondary py-3 w-20 capitalize font-semibold text-sm rounded-md text-white shadow-xl">cancel</button>
          <button onClick={confirmDup} className="bg-primary py-3 w-20 capitalize font-semibold ml-auto text-sm rounded-md text-white shadow-xl">proceed</button>
        </div>
      </ModalLayout>
    </>
  );
};

export default ConfirmDuplicateService;