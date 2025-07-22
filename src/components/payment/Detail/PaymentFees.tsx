import type { PaymentType } from "../../../types/paymentType";

type props = {
    payment: PaymentType;
}

export const PaymentFees = ({ payment }: props) => {
    return <div className="mt-8">
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
}