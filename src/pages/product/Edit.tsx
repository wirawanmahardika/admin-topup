import { useEffect, useState } from "react";
import type { productType } from "../../types/productType";
import { useParams } from "react-router-dom";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { AxiosAuth } from "../../utils/axios";
import { ToastContainer } from "react-toastify";

const defaultValue = {
    id: "",
    id_brand: "",
    digiflazz_product: true,
    product_name: "",
    category: "",
    type: "",
    seller_name: "",
    price: 0,
    resell_price: 0,
    buyer_sku_code: "",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: false,
    stock: 0,
    multi: true,
    start_cut_off: "",
    end_cut_off: "",
    desc: "",
    created_at: "",
    updated_at: "",
}

export default function EditProduct() {
    const { id } = useParams()
    const [formData, setFormData] = useState<productType>(defaultValue);

    const handleChange = (field: keyof productType, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    useEffect(() => {
        AxiosAuth.get("/product/" + id)
            .then(res => setFormData(res.data.data))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.put(`/product/${id}`, {
                resell_price: formData.resell_price,
                product_name: formData.product_name
            })
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Gagal menambah product")
        }
    };

    return (
        <div className="flex min-h-screen text-white font-sans">
            <ToastContainer />
            {/* Konten */}
            <main className="flex-1 p-6 sm:p-10">
                <h1 className="text-2xl font-bold text-primary mb-8">Edit Produk</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#1a1a1a] border border-primary p-6 sm:p-8 rounded-2xl shadow-xl max-w-xl"
                >
                    {/* Nama Produk */}
                    <div className="mb-6">
                        <label className="block mb-1 text-sm font-medium">Nama Produk</label>
                        <input
                            type="text"
                            value={formData?.product_name}
                            onChange={(e) => handleChange("product_name", e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-black border border-primary text-white placeholder-white focus:ring-2 focus:ring-primary/50 transition"
                            placeholder="Masukkan nama produk"
                        />
                    </div>

                    {/* Harga Dasar (Read-only) */}
                    <div className="mb-6">
                        <label className="block mb-1 text-sm font-medium">Harga Dasar</label>
                        <div className="px-4 py-2 bg-[#111111] border border-[#333] rounded-md text-gray-300">
                            {`${formData.price?.toLocaleString("id-ID") ?? "tidak diatur"}`}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Harga dari supplier (tidak bisa diubah)</p>
                    </div>

                    {/* Harga Jual */}
                    <div className="mb-6">
                        <label className="block mb-1 text-sm font-medium">Harga Jual</label>
                        <input
                            type="number"
                            value={formData?.resell_price ?? 0}
                            onChange={(e) => handleChange("resell_price", +e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-black border border-primary text-white placeholder-white focus:ring-2 focus:ring-primary/50 transition"
                            placeholder="Masukkan harga jual"
                        />
                        {formData.resell_price < formData.price && (
                            <p className="text-sm text-red-400 mt-1">⚠️ Harga jual lebih rendah dari harga dasar!</p>
                        )}
                    </div>

                    {/* Tombol Simpan */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-primary hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                    >
                        Simpan Perubahan
                    </button>
                </form>
            </main>
        </div>
    );
}
