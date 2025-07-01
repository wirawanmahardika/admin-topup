import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosAuth } from "../../utils/axios";
import type { productType } from "../../types/productType";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState<productType | null>(null)

    useEffect(() => {
        AxiosAuth.get("/product/" + id)
            .then(res => { setProduct(res.data.data) })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.patch("/product/" + id, { price: product?.resell_price })
            loadingSuccessToast(idToast, res.data.message ?? "Berhasil")
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Terjadi kesalahan saat update product")
        }

    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <ToastContainer />
            <h2 className="text-xl font-bold mb-4">Edit Produk Topup Game</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Harga Asli</label>
                    <input
                        type="number"
                        className="input input-primary input-bordered w-full"
                        value={product?.price || ""}
                        readOnly
                        min={0}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Harga Resell</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        value={product?.resell_price || ""}
                        onChange={e => {
                            setProduct((v) => {
                                if (!v) return null
                                return {
                                    ...v,
                                    resell_price: parseInt(e.target.value)
                                }
                            })
                        }}
                        min={0}
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    )
}