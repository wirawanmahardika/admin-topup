import { NavLink } from "react-router-dom"
import type { transactionType } from "../../types/transactionType"

export default function RecentTransactionTable({ transactionData }: { transactionData: transactionType[] }) {
    return <div className="mt-10 bg-base-200 p-5 rounded">
        <div className="flex justify-between">
            <h3 className="font-bold mb-3">Transaksi Terbaru</h3>
            <NavLink to={"/transaksi"} className="btn btn-info">Detail</NavLink>
        </div>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>No Customer</th>
                        <th>Produk</th>
                        <th>Game</th>
                        <th>Harga</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionData?.map((trx, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{trx.customer_number}</td>
                                <td>{trx.product?.product_name}</td>
                                <td>{trx.brand?.name}</td>
                                <td>Rp {(trx.product?.resell_price)?.toLocaleString()}</td>
                                <td>
                                    {trx.topup_status === "Sukses" && <span className="badge badge-success">Berhasil</span>}
                                    {trx.topup_status === "Pending" && <span className="badge badge-warning">Pending</span>}
                                    {trx.topup_status === "Gagal" && <span className="badge badge-error">Gagal</span>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
}