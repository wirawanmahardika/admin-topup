import { ToastContainer } from "react-toastify";
import { AxiosAuth } from "../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";

const paymentTypes = ["bank_transfer", "cstore", "qris"]

export default function TambahPayment() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.post('/payment', formData)
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <ToastContainer />
            <h2 className="text-xl font-bold mb-4">Tambah Metode Pembayaran</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Tipe</label>
                    <select 
                        name="type"
                        className="select w-full"
                        required
                    >
                        {paymentTypes.map((p, i) => <option key={i} value={p}>{p.replace("_", " ")}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Channel</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        name="channel_code"
                        placeholder="Masukkan tipe channel.. (BNI, Gopay, QRIS)"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Display Nama</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        name="name"
                        placeholder="Masukkan tampilan nama yang akan terlihat oleh user..."
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Logo</label>
                    <input
                        type="file"
                        className="file-input w-full"
                        name="image"
                        placeholder="logo"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        name="description"
                        rows={2}
                    />
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Simpan</button>
                </div>
            </form>
        </div>
    );
}