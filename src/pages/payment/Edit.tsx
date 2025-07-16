import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosAuth } from "../../utils/axios";
import type { PaymentType } from "../../types/paymentType";
import {
    loadingErrorToast,
    loadingSuccessToast,
    loadingToast,
} from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import type { paymentFeeType } from "../../types/paymentFeeType";

const paymentTypes = ["bank_transfer", "cstore", "qris", "echannel"];

export default function EditPayment() {
    const { id } = useParams();
    const [payment, setPayment] = useState<PaymentType>();
    const [paymentIsActive, setPaymentIsActive] = useState(false);
    const [fees, setFees] = useState<{ amount: number; is_percentage: boolean }[]>([]);

    useEffect(() => {
        AxiosAuth.get("/payment/" + id).then((res) => {
            const data = res.data.data;
            setPayment(data);
            setPaymentIsActive(data.active);
            setFees(data.payment_fees?.map((f: paymentFeeType) => ({
                amount: f.amount,
                is_percentage: f.is_percentage
            })) || []);
        });
    }, [id]);

    const handleFeeChange = (index: number, field: string, value: any) => {
        const updated = [...fees];
        updated[index] = { ...updated[index], [field]: value };
        setFees(updated);
    };

    const addFee = () => {
        setFees([...fees, { amount: 0, is_percentage: false }]);
    };

    const removeFee = (index: number) => {
        const updated = fees.filter((_, i) => i !== index);
        setFees(updated);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) return;

        const formData = new FormData(e.currentTarget);
        formData.append("active", String(paymentIsActive));
        formData.append("payment_fees", JSON.stringify(fees));

        const idToast = loadingToast();
        const isValidFees = fees.every(f => typeof f.amount === 'number' && !isNaN(f.amount));
        if (!isValidFees) {
            loadingErrorToast(idToast, "Nominal fee harus berupa angka yang valid.");
            return;
        }
        try {
            const res = await AxiosAuth.put("/payment/" + id, formData);
            loadingSuccessToast(idToast, res.data.message);
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan");
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-2xl mx-auto">
            <ToastContainer />
            <h2 className="text-xl font-bold mb-6">Edit Metode Pembayaran</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium">Tipe</label>
                    <select
                        className="select select-bordered w-full"
                        name="type"
                        defaultValue={payment?.type}
                        required
                    >
                        {paymentTypes.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
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
                        placeholder="Masukkan channel (BNI, QRIS, dsb)"
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
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        name="description"
                        defaultValue={payment?.description}
                        rows={2}
                    />
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={paymentIsActive}
                        onChange={(e) => setPaymentIsActive(e.target.checked)}
                        id="active"
                    />
                    <label htmlFor="active" className="cursor-pointer">Aktif</label>
                </div>

                {/* Payment Fees */}
                <div className="border border-base-300 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">Biaya Tambahan</h3>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline btn-primary"
                            onClick={addFee}
                        >
                            + Tambah Fee
                        </button>
                    </div>

                    {fees.length === 0 && (
                        <p className="text-sm text-gray-400">Tidak ada biaya tambahan</p>
                    )}

                    <div className="space-y-4">
                        {fees.map((fee, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
                            >
                                <input
                                    type="number"
                                    value={fee.amount}
                                    onChange={(e) =>
                                        handleFeeChange(index, "amount", parseFloat(e.target.value))
                                    }
                                    className="input input-bordered w-full"
                                    placeholder="Nominal"
                                    min={0}
                                    step="any"
                                    required
                                />
                                <div>
                                    <label className="block mb-1 text-sm">Tipe</label>
                                    <select
                                        value={fee.is_percentage ? "percent" : "fixed"}
                                        onChange={(e) =>
                                            handleFeeChange(index, "is_percentage", e.target.value === "percent")
                                        }
                                        className="select select-bordered w-full"
                                    >
                                        <option value="fixed">Tetap (Rp)</option>
                                        <option value="percent">Persentase (%)</option>
                                    </select>
                                </div>
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => removeFee(index)}
                                        className="btn btn-sm btn-error btn-outline"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
