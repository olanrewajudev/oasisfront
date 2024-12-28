import { useState, useCallback, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Component/Admin/AdminLayout";
import { AuthGeturl, Apis, AuthPosturl, offlineServer } from "../../../Component/Utils/Api";
import { ErrorAlert, ToastAlert, formatDate } from "../../../Component/Utils/Utils";
import DeleteSection from "./DeleteSection";

interface Section {
    id: string;
    title: string;
    image: string;
    createdAt: Date;
}

const tableTitle = [
    "s/n",
    "title",
    "image",
    "date created",
    "edit",
    "delete",
];

const AllSection: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [sections, setSections] = useState<Section[]>([]);
    const [del, setDel] = useState<boolean>(false);
    const [singles, setSingles] = useState<Section | null>(null);
    const [loads, setLoads] = useState<boolean>(false);

    const fetchAllSections = useCallback(async () => {
        const res = await AuthGeturl(Apis.prices.all_section);
        if (res.status === 200) {
            setLoading(false);
            setSections(res.msg);
        }
    }, []);

    useEffect(() => {
        fetchAllSections();
    }, [fetchAllSections]);


    const DeleteItem = (item: Section) => {
        setDel(!del);
        setSingles(item);
    };

    const confirmAction = async () => {
        if (!singles) return;
        const data = { id: singles.id };
        setLoads(!loads);
        const res = await AuthPosturl(Apis.prices.delete_section, data);
        setLoads(false);
        if (res.status === 200) {
            fetchAllSections();
            setDel(!del);
            return ToastAlert(res.msg);
        } else {
            return ErrorAlert(res.msg);
        }
    };

    return (
        <AdminLayout>
            {del && singles && (
                <DeleteSection confirmAction={confirmAction} closeView={() => setDel(!del)} />
            )}

            <div className="">
                <div className="mt-10 w-11/12 mx-auto pl-3 flex items-center gap-3">
                    <div className="text-2xl font-semibold text-navy">All Sections</div>
                    <Link to='/auth/admin/section/new' className="border border-default text-navy py-3 px-5 rounded-full uppercase hover:bg-light hover:text-white flex items-center gap-2 text-sm font-semibold">
                        <FaPlus /> new
                    </Link>
                </div>

                <div className="w-11/12 mx-auto bg-white p-3 rounded-lg shadow-xl mt-10 mb-16 overflow-x-auto">
                    {!loading && (
                        <table className="w-full border table-auto">
                            <thead>
                                <tr className="bg-light">
                                    {tableTitle.map((item, i) => (
                                        <td key={i} className="uppercase text-sm font-semibold text-white p-2 border">
                                            {item}
                                        </td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sections.length > 0 &&
                                    sections.map((item, i) => (
                                        <tr key={i}>
                                            <td className="uppercase text-sm p-2 border">{i + 1}</td>
                                            <td className="uppercase text-sm p-2 border">{item.title}</td>
                                            <td className="uppercase text-sm p-2 border text-right">
                                                <div className="flex items-center justify-center">
                                                    {item.image ? (
                                                        <img src={`${offlineServer}/sections/${item.image}`} alt="" className="h-10" />
                                                    ) : (
                                                        '?'
                                                    )}
                                                </div>
                                            </td>
                                            <td className="text-sm p-2 border">{formatDate(item.createdAt)}</td>
                                            <td className="uppercase text-sm p-2 border text-right">
                                                <Link to={`/auth/admin/section/edit/${item.id}`} className="bg-light text-xs rounded-lg text-white py-2 px-4 uppercase">
                                                    edit
                                                </Link>
                                            </td>
                                            <td className="uppercase text-sm p-2 border text-right">
                                                <button onClick={() => DeleteItem(item)} className="bg-primary text-xs rounded-lg text-white py-2 px-4 uppercase">
                                                    delete
                                                </button>
                                            </td>
                                          

                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AllSection;
