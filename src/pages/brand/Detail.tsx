import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { AxiosAuth } from "../../utils/axios";
import { errorToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { type brandType } from "../../types/brandType";

const useBrandDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [brand, setBrand] = useState<brandType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      errorToast("ID brand tidak valid");
      navigate("/brands");
      return;
    }

    const fetchBrand = async () => {
      setLoading(true);
      try {
        const res = await AxiosAuth.get(`/brand/${id}`);
        const brandData: brandType = res.data.data;
        console.log(brandData);

        setBrand(brandData);
      } catch (error: any) {
        errorToast(error.response?.data?.message ?? "Gagal memuat detail brand");
        navigate("/brands");
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id, navigate]);

  return { brand, loading };
};

export default function DetailBrand() {
  const { id } = useParams<{ id: string }>();
  const { brand, loading } = useBrandDetail();
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="bg-base-100 rounded-lg shadow p-6 mx-auto">
        <p className="text-error">Data brand tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-300 rounded-lg shadow p-6 w-full lg:w-2/3">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Detail Brand</h2>
      <div className="flex flex-col gap-6">
        {/* Informasi Brand */}
        <div className="grid justify-items-center grid-cols-2 gap-8">
          <div>
            <label className="block mb-1 font-semibold text-base-content">Logo Brand</label>
            <div className="w-32 h-32 rounded overflow-hidden">
              <img
                src={brand.image || "https://via.placeholder.com/128"}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base-content">Nama Brand</label>
            <p className="text-lg font-medium text-gray-500">{brand.name}</p>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base-content">Popularitas</label>
            <p className="text-lg font-medium text-gray-500">{brand.popularity}</p>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base-content">Operator</label>
            <p className="text-lg font-medium text-gray-500 capitalize">{brand.operator || "Tidak diketahui"}</p>
          </div>
        </div>
        {/* Data Customer (input_fields) */}
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Input Fields</h3>
            <NavLink to={`/brand/${id}/input-field/edit`} className="btn btn-primary btn-sm">Edit</NavLink>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th className="text-base-content">Input Key</th>
                  <th className="text-base-content">Label</th>
                  <th className="text-base-content">Placeholder</th>
                  <th className="text-base-content">Urutan Tampil</th>
                </tr>
              </thead>
              <tbody>
                {
                  brand.input_fields?.map((i) => {
                    return <tr key={i.id}>
                      <td>{i.input_key}</td>
                      <td>{i.label}</td>
                      <td>{i.placeholder}</td>
                      <td>{i.order_index}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
      <div className="flex justify-start mt-6">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/brands")}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}