import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DataCustomer } from "../../components/brand/Detail/DataCustomer";
import { InputFields } from "../../components/brand/Detail/InputFields";
import { useBrandDetail } from "../../hooks/brand/Detail/useBrandDetail";

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
        <DataCustomer brand={brand} />
        <InputFields id={id} brand={brand} />
      </div>
      <div className="flex justify-start mt-6">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/brands")}
        >
          Kembali
        </button>
      </div>
    </div >
  );
}