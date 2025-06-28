import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function TambahBrand() {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [popularity, setPopularity] = useState(0);
    const [products, setProducts] = useState<string>(""); // untuk menyimpan hasil stringify
    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("image", image);
        formData.append("popularity", popularity.toString());
        formData.append("products", products);

        const idToast = loadingToast()
        try {
            await axios.post("http://localhost:3000/brand", formData, { headers: { "Content-Type": "multipart/form-data" } });
            navigate("/brands");
        } catch (err: any) {
            loadingErrorToast(idToast, err.response?.data?.message ?? "Gagal menambah brand!")
        }
        setLoading(false);
    };

    const handleLoadProducts = async () => {
        setLoadingProducts(true);
        const idToast = loadingToast("sedang mengambil data product dengan brand " + name)
        try {
            const res = await axios.get("http://localhost:3000/products/digiflazz", { params: { brand: name } });
            setProducts(JSON.stringify(res.data.data));
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Gagal memuat produk dari third party!")
        }
        setLoadingProducts(false);
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <ToastContainer />
            <h2 className="text-xl font-bold mb-4">Tambah Brand Baru</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold">Nama Brand</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Logo Brand</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                        onChange={e => setImage(e.target.files?.[0] || null)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Popularitas</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        value={popularity}
                        min={0}
                        onChange={e => setPopularity(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Produk (dari Third Party)</label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleLoadProducts}
                            disabled={loadingProducts || !name} // hanya aktif jika name sudah diisi
                        >
                            {loadingProducts ? "Memuat..." : "Load Product dari Third Party"}
                        </button>
                        {products && (
                            <span className="text-success text-xs">Produk siap dikirim</span>
                        )}
                    </div>
                    {/* Optional: tampilkan preview jumlah produk */}
                    {products && (
                        <div className="mt-2 text-xs text-gray-500">
                            {JSON.parse(products).length} produk siap dikirim
                        </div>
                    )}
                </div>
                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/brands")}
                        disabled={loading}
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !products}
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    )
}