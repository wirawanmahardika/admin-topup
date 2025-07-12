import { useEffect, useState } from "react";
import type { PaymentType } from "../../types/paymentType";
import { AxiosAuth } from "../../utils/axios";
import { NavLink } from "react-router-dom";

export default function PaymentInfo() {
    const [payments, setPayments] = useState<PaymentType[]>([])

    useEffect(() => {
        AxiosAuth.get("/payments")
            .then(res => { setPayments(res.data.data) })
    }, [])

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 mx-auto w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-6">Daftar Metode Pembayaran</h2>
                <NavLink to={"/payment/tambah"} className="btn btn-primary">Tambah Payment</NavLink>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Display Name</th>
                            <th>Tipe</th>
                            <th>Channel</th>
                            <th>Status</th>
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
                                <td>
                                    <span className="text-sm">{p.description || "-"}</span>
                                </td>
                                <td>
                                    <div className="flex gap-x-2 items-center">
                                    <NavLink to={`/payment/${p.id}/edit`} className="btn btn-accent btn-sm">Edit</NavLink>
                                    <button className="btn btn-error btn-sm">Hapus</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}