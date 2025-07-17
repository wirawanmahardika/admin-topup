import { useParams } from "react-router-dom";
import type { PaymentType } from "../../types/paymentType";
import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";

const paymentDefault: PaymentType = {
    id: "pay-001",
    type: "bank_transfer",
    channel_code: "bca",
    name: "BCA Virtual Account",
    active: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Bank_Central_Asia.svg/512px-Bank_Central_Asia.svg.png",
    description: "Pembayaran melalui Virtual Account BCA",
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-10T12:00:00Z",
    payment_fees: [
        {
            id: "fee-001",
            id_payment_type: "pay-001",
            amount: 2000,
            is_percentage: false,
            created_at: "2024-01-01T10:00:00Z",
            updated_at: "2024-01-01T10:00:00Z"
        },
        {
            id: "fee-002",
            id_payment_type: "pay-001",
            amount: 2.5,
            is_percentage: true,
            created_at: "2024-01-02T10:00:00Z",
            updated_at: "2024-01-02T10:00:00Z"
        }
    ]
};

export default function PaymentDetail() {
    const { id } = useParams()
    const [payment, setPayment] = useState<PaymentType>(paymentDefault)

    useEffect(() => {
        AxiosAuth.get("/payment/" + id)
            .then(res => {
                setPayment(res.data.data)
            })
    }, [])

    return (
        <div className="min-h-screen bg-base-100 text-base-content p-6">
            <div className="max-w-4xl mx-auto bg-base-200 p-6 rounded-xl shadow-lg border border-base-300">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img
                        src={payment.image}
                        alt={payment.name}
                        className="w-24 h-24 object-contain rounded border border-primary shadow-primary-content shadow p-2"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-primary">{payment.name}</h2>
                        <p className="text-sm text-gray-400 mt-1">{payment.type.replace("_", " ")}</p>
                        <div className="mt-2">
                            <span className={`badge ${payment.active ? "badge-success" : "badge-error"} badge-outline`}>
                                {payment.active ? "Aktif" : "Tidak Aktif"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Channel Code</p>
                        <p>{payment.channel_code || "-"}</p>
                    </div>
                    {/* <div>
                        <p className="text-sm text-gray-400 mb-1">Biaya Midtrans</p>
                        <p>Rp {payment.midtrans_price.toLocaleString("id-ID")}</p>
                    </div> */}
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Dibuat pada</p>
                        <p>{new Date(payment.created_at).toLocaleString("id-ID")}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Terakhir diperbarui</p>
                        <p>{new Date(payment.updated_at).toLocaleString("id-ID")}</p>
                    </div>
                </div>

                {payment.description && (
                    <div className="mt-6">
                        <p className="text-sm text-gray-400 mb-1">Deskripsi</p>
                        <p className="text-base">{payment.description}</p>
                    </div>
                )}

                {/* Payment Fees */}
                {payment.payment_fees && payment.payment_fees?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-primary mb-4">Biaya Admin Midtrans</h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-sm bg-base-100 border border-base-300 rounded-lg">
                                <thead>
                                    <tr className="text-base-content">
                                        <th>#</th>
                                        <th>Nominal</th>
                                        <th>Tipe</th>
                                        <th>Dibuat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payment.payment_fees?.map((fee, idx) => (
                                        <tr key={fee.id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                {fee.is_percentage
                                                    ? `${fee.amount}%`
                                                    : `Rp ${fee.amount.toLocaleString("id-ID")}`}
                                            </td>
                                            <td>{fee.is_percentage ? "Persentase" : "Tetap"}</td>
                                            <td>{new Date(fee.created_at).toLocaleDateString("id-ID")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
