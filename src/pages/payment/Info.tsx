import { useEffect, useReducer } from "react";
import { AxiosAuth } from "../../utils/axios";
import { NavLink } from "react-router-dom";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { paymentInfoReducer } from "../../hooks/payment/Info/reducer";

export default function PaymentInfo() {
    const [payments, dispatch] = useReducer(paymentInfoReducer, [])

    useEffect(() => {
        AxiosAuth.get("/payments").then(res => { dispatch({ type: "get-all", payload: res.data.data }) })
    }, [])

    const handleHapusPayment = async (id: string) => {
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.delete("/payment/" + id)
            dispatch({ type: "delete", payload: id })
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    }

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 mx-auto w-full">
            <ToastContainer />
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
                                        <button onClick={() => handleHapusPayment(p.id)} className="btn btn-error btn-sm">Hapus</button>
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