import { NavLink } from "react-router-dom";
import type { paymentFeeType } from "../../../types/paymentFeeType";
import type { PaymentType } from "../../../types/paymentType";
import { openModal } from "../../Modal";

function getMidtransFee(payment_fee: paymentFeeType[]) {
    const resultArray = payment_fee.map((pf) => {
        return pf.is_percentage ? `${pf.amount}%` : pf.amount.toLocaleString("id");
    });
    return resultArray.join(" + ");
}

type props = {
    payments: PaymentType[];
    setId: React.Dispatch<React.SetStateAction<string>>;
};

export const PaymentsTableDisplay = ({ payments, setId }: props) => {
    return (
        <>
            {/* Tabel Desktop */}
            <div className="overflow-x-auto hidden md:block">
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
                                <td className="text-sm">{p.payment_fees ? getMidtransFee(p.payment_fees) : "Belum diatur"}</td>
                                <td className="text-sm">{p.description || "-"}</td>
                                <td>
                                    <div className="flex flex-wrap gap-2">
                                        <NavLink to={`/payment/${p.id}/detail`} className="btn btn-info btn-sm">Detail</NavLink>
                                        <NavLink to={`/payment/${p.id}/edit`} className="btn btn-accent btn-sm">Edit</NavLink>
                                        <button
                                            onClick={() => {
                                                setId(p.id);
                                                openModal("delete-payment");
                                            }}
                                            className="btn btn-error btn-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card Mobile */}
            <div className="md:hidden space-y-4">
                {payments.map((p) => (
                    <div key={p.id} className="card bg-base-100 shadow-md border border-base-300 p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-16 rounded">
                                    <img src={p.image} alt={p.name} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{p.name}</h2>
                                <p className="text-sm text-gray-500">{p.description || "-"}</p>
                                <p className="text-xs mt-1">{p.channel_code || "-"}</p>
                                <p className="text-xs">Tipe: {p.type}</p>
                            </div>
                        </div>

                        <div className="mt-4 text-sm space-y-1">
                            <p>Status:{" "}
                                <span className={`badge ${p.active ? "badge-success" : "badge-error"}`}>
                                    {p.active ? "Aktif" : "Nonaktif"}
                                </span>
                            </p>
                            <p>Potongan Midtrans: {p.payment_fees ? getMidtransFee(p.payment_fees) : "Belum diatur"}</p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <NavLink to={`/payment/${p.id}/detail`} className="btn btn-info btn-sm flex-1">Detail</NavLink>
                            <NavLink to={`/payment/${p.id}/edit`} className="btn btn-accent btn-sm flex-1">Edit</NavLink>
                            <button
                                onClick={() => {
                                    setId(p.id);
                                    openModal("delete-payment");
                                }}
                                className="btn btn-error btn-sm flex-1"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
