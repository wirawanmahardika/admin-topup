import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosAuth } from "../../utils/axios";
import type { PaymentType } from "../../types/paymentType";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

const paymentTypes = ["bank_transfer", "cstore", "qris", "echannel"]

export default function EditPayment() {
    const { id } = useParams();
    const [payment, setPayment] = useState<PaymentType>()
    const [paymentIsActive, setPaymentIsActive] = useState(false)

    useEffect(() => {
        AxiosAuth.get("/payment/" + id)
            .then(res => {
                setPayment(res.data.data)
                setPaymentIsActive(res.data.data.active)
            })
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) return
        const formData = new FormData(e.currentTarget)
        formData.append("active", String(paymentIsActive))

        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.put("/payment/" + id, formData)
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <ToastContainer />
            <h2 className="text-xl font-bold mb-4">Edit Metode Pembayaran</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Tipe</label>
                    <select
                        className="select select-bordered w-full"
                        name="type"
                        defaultValue={payment?.type}
                    >
                        {paymentTypes.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Channel</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        name="channel_code"
                        defaultValue={payment?.channel_code}
                        placeholder="Masukkan tipe channel.. (BNI, Gopay, QRIS)"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Nama di Tampilan Pengguna</label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full"
                        defaultValue={payment?.name}
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
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Potongan Midtrans</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        name="midtrans_price"
                        defaultValue={payment?.midtrans_price}
                        rows={2}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        name="description"
                        defaultValue={payment?.description}
                        rows={2}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={paymentIsActive}
                        onChange={e => setPaymentIsActive(e.target.checked)}
                        id="active"
                    />
                    <label htmlFor="active" className="cursor-pointer">Aktif</label>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
}