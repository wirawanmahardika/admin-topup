import { AxiosAuth } from "../../utils/axios";
import { useParams } from "react-router-dom";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

export default function TambahProduct() {
    const { id } = useParams()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            product_name: e.currentTarget.product_name.value,
            resell_price: Number(e.currentTarget.price.value),
            description: e.currentTarget.desc.value
        }

        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.post(`/brand/${id}/product`, body)
            loadingSuccessToast(idToast, res.data.message)
        } catch (error:any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <ToastContainer />
            <h2 className="text-xl font-bold mb-4">Tambah Produk Topup Game</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nama Produk</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        name="product_name"
                        placeholder="Contoh: 86 Diamonds"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Harga</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Contoh: 20000"
                        name="price"
                        min={0}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea rows={5} name="desc" className="textarea w-full font-medium" placeholder="Masukkan deskripsi disini..."></textarea>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}