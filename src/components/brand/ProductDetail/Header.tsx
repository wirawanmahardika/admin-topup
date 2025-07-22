import { NavLink } from "react-router-dom";
import type { brandType } from "../../../types/brandType"
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { AxiosAuth } from "../../../utils/axios";

type props = {
    id?: string;
    brand: brandType | null;
    fetchProducts: () => Promise<void>
}

export const HeaderBrandProductDetail = ({ id, brand, fetchProducts }: props) => {
    const [loading, setLoading] = useState(false);
    const handleSync = async () => {
        if (!id) return;
        setLoading(true);
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.put(`/brand/${id}/products`);
            loadingSuccessToast(idToast, res.data.message ?? "Berhasil update product dari brand " + brand?.name)
            await fetchProducts();
        } catch (err: any) {
            loadingErrorToast(idToast, err.response?.data?.message ?? "Gagal update data produk!");
        }
        setLoading(false);
    };

    return <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Produk dari Brand: {brand?.name}</h2>
        <div className="flex gap-2">
            {brand?.operator === "manual" ?
                <NavLink to={`/brand/${id}/product/tambah`} className="btn btn-primary flex items-center gap-2" >
                    Tambah Produk
                </NavLink>
                :
                <button
                    className="btn btn-accent flex items-center gap-2"
                    onClick={handleSync}
                    disabled={loading}
                >
                    <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
                    {loading ? "Memperbarui..." : "Update Produk"}
                </button>
            }
            <NavLink to="/brands" className="btn btn-secondary">Kembali ke Brand</NavLink>
        </div>
    </div>
}