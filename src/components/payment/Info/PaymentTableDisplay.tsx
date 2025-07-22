import { NavLink } from "react-router-dom";
import type { paymentFeeType } from "../../../types/paymentFeeType";
import type { PaymentType } from "../../../types/paymentType"
import { openModal } from "../../Modal";

function getMidtransFee(payment_fee: paymentFeeType[]) {
    const resultArray = payment_fee.map((pf) => {
        if (pf.is_percentage) {
            return `${pf.amount}%`;
        } else {
            return pf.amount.toLocaleString("id");
        }
    });

    return resultArray.join(" + ");
}


type props = {
    payments: PaymentType[]
    setId: React.Dispatch<React.SetStateAction<string>>
}

export const PaymentsTableDisplay = ({ payments, setId }: props) => {
    return <div className="overflow-x-auto">
        <table className="table w-full">
            <thead>
                <tr>
                    <th>Logo</th>
                    <th>Display Name</th>
                    <th>Tipe</th>
                    <th>Channel</th>
                    <th>Status</th>
                    <th>Potongan Midtrans</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((p) => (
                    <tr key={p.id}>
                        <td>
                            <div className="avatar">
                                <div className="w-12 rounded">
                                    <img src={p.image} alt={p.name} />
                                </div>
                            </div>
                        </td>
                        <td className="font-semibold">{p.name}</td>
                        <td>{p.type}</td>
                        <td>{p.channel_code || "-"}</td>
                        <td>
                            {p.active ? (
                                <span className="badge badge-success">Aktif</span>
                            ) : (
                                <span className="badge badge-error">Nonaktif</span>
                            )}
                        </td>
                        <td><span className="text-sm">{p.payment_fees ? getMidtransFee(p.payment_fees) : "Belum diatur"}</span></td>
                        <td><span className="text-sm">{p.description || "-"}</span></td>
                        <td>
                            <div className="flex gap-x-2 items-center gap-2">
                                <NavLink to={`/payment/${p.id}/detail`} className="btn btn-info btn-sm">Detail</NavLink>
                                <NavLink to={`/payment/${p.id}/edit`} className="btn btn-accent btn-sm">Edit</NavLink>
                                <button onClick={() => {
                                    setId(p.id)
                                    openModal("delete-payment")
                                }} className="btn btn-error btn-sm">Hapus</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}
