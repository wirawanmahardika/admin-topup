import { ToastContainer } from "react-toastify";
import { paymentTypes } from "../../types/paymentType";
import { uesTambahPayment } from "../../hooks/payment/Tambah/useTambahPayment";

export default function TambahPayment() {
    const { fees,
        handleSubmit,
        handleFeeChange, 
        addFee, 
        removeFee,
        cancelable, setCancelable,
        refundable, setRefundable
    } = uesTambahPayment()


    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-2xl mx-auto">
            <ToastContainer />
            <h2 className="text-xl font-bold mb-6">Tambah Metode Pembayaran</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* TYPE */}
                <div>
                    <label className="block mb-1 font-medium">Tipe</label>
                    <select name="type" className="select select-bordered w-full" required>
                        {paymentTypes.map((p, i) => (
                            <option key={i} value={p}>
                                {p.replace("_", " ")}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CHANNEL */}
                <div>
                    <label className="block mb-1 font-medium">Channel</label>
                    <input
                        type="text"
                        name="channel_code"
                        className="input input-bordered w-full"
                        placeholder="Masukkan channel (BCA, QRIS, dll)"
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

                {/* AKTIVASI REFUND */}
                <div>
                    <label className="block mb-1 font-medium">Display Name</label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full"
                        placeholder="Nama yang terlihat oleh user"
                        required
                    />
                </div>

                {/* IMAGE */}
                <div>
                    <label className="block mb-1 font-medium">Logo</label>
                    <input
                        type="file"
                        name="image"
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full"
                        rows={2}
                    />
                </div>

                {/* PAYMENT FEES */}
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
                                    step="any"
                                    value={fee.amount}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        handleFeeChange(index, "amount", isNaN(val) ? 0 : val);
                                    }}
                                    className="input input-bordered w-full"
                                    placeholder="Nominal"
                                    min={0}
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

                {/* SUBMIT */}
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
}
