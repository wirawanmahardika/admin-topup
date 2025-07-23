import { useEditPayment } from "../../hooks/payment/Edit/useEditPayment";
import { paymentTypes } from "../../types/paymentType";
import { ToastContainer } from "react-toastify";

export default function EditPayment() {
    const { handleSubmit,
        handleFeeChange,
        paymentType,
        payment,
        setPaymentIsActive,
        paymentIsActive,
        setPaymentType,
        addFee,
        fees,
        removeFee, 
        cancelable, setCancelable, refundable, setRefundable
    } = useEditPayment()

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
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
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

                <div className="flex gap-x-5">
                    {/* AKTIVASI CANCEL */}
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text font-medium">Cancelable</span>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                checked={cancelable}
                                onChange={(e) => setCancelable(e.target.checked)}
                            />
                        </label>
                    </div>

                    {/* AKTIVASI REFUND */}
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text font-medium">Refundable</span>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                checked={refundable}
                                onChange={(e) => setRefundable(e.target.checked)}
                            />
                        </label>
                    </div>
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
