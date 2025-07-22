import dayjs from "dayjs";
import type { transactionType } from "../../../types/transactionType";
import { TopupStatusSelect } from "./TopupStatusSelect";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { NavLink } from "react-router-dom";
import ModalConfirmation, { openModal } from "../../Modal";
import { useState } from "react";

interface TransactionTableProps {
    transactions: transactionType[];
    isLoading: boolean;
    onDeleteTransaction: (id: string) => void;
}

export const TransactionTable = ({
    transactions,
    isLoading,
    onDeleteTransaction
}: TransactionTableProps) => {
    const [id, setId] = useState("")

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="w-full">
            <ModalConfirmation
                id="delete-transaction"
                message="Yakin ingin menghapus transaksi?"
                clickAction={() => { onDeleteTransaction(id) }}
            />

            {/* Tabel untuk desktop */}
            <div className="overflow-x-auto hidden md:block">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>No Customer</th>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Profit</th>
                            <th>Tanggal Dibuat</th>
                            <th>Operator</th>
                            <th>Payment Status</th>
                            <th>Topup Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="text-center text-gray-400">
                                    Belum ada transaksi
                                </td>
                            </tr>
                        ) : (
                            transactions.map((trx) => (
                                <tr key={trx.id}>
                                    <td>{trx.id}</td>
                                    <td>{trx.customer_number}</td>
                                    <td>{trx.product?.product_name ?? <span className="italic text-red-300">None</span>}</td>
                                    <td>{trx.brand?.name ?? <span className="italic text-red-300">None</span>}</td>
                                    <td>Rp {trx.profit.toLocaleString()}</td>
                                    <td>{dayjs(trx.created_at).format("D MMMM YYYY, HH:mm")}</td>
                                    <td>
                                        <span className={`badge ${trx.brand?.operator === "sistem" ? "badge-info" : "badge-secondary"}`}>
                                            {trx.brand?.operator === "sistem" ? "Sistem" : "Manual"}
                                        </span>
                                    </td>
                                    <td><PaymentStatusBadge status={trx.payment_status} /></td>
                                    <td><TopupStatusSelect value={trx.topup_status} /></td>
                                    <td className="space-x-3">
                                        <NavLink to={`/transaksi/${trx.id}/detail`} className="btn btn-info btn-sm">Detail</NavLink>
                                        <button
                                            onClick={() => {
                                                setId(trx.id);
                                                openModal("delete-transaction");
                                            }}
                                            className="btn btn-error btn-sm"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card view untuk mobile */}
            <div className="md:hidden space-y-4">
                {transactions.length === 0 ? (
                    <p className="text-center text-gray-400">Belum ada transaksi</p>
                ) : (
                    transactions.map((trx) => (
                        <div key={trx.id} className="card bg-base-100 shadow p-4 border">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-bold text-sm">{trx.product?.product_name ?? "Produk tidak tersedia"}</h2>
                                <PaymentStatusBadge status={trx.payment_status} />
                            </div>
                            <p><span className="font-semibold">ID:</span> {trx.id}</p>
                            <p><span className="font-semibold">No Customer:</span> {trx.customer_number}</p>
                            <p><span className="font-semibold">Brand:</span> {trx.brand?.name ?? "-"}</p>
                            <p><span className="font-semibold">Profit:</span> Rp {trx.profit.toLocaleString()}</p>
                            <p><span className="font-semibold">Tanggal:</span> {dayjs(trx.created_at).format("D MMMM YYYY, HH:mm")}</p>
                            <p>
                                <span className="font-semibold">Operator:</span>{" "}
                                <span className={`badge ${trx.brand?.operator === "sistem" ? "badge-info" : "badge-secondary"}`}>
                                    {trx.brand?.operator === "sistem" ? "Sistem" : "Manual"}
                                </span>
                            </p>
                            <div className="mt-2">
                                <TopupStatusSelect value={trx.topup_status} />
                            </div>
                            <div className="mt-3 flex space-x-2">
                                <NavLink to={`/transaksi/${trx.id}/detail`} className="btn btn-info btn-sm flex-1">Detail</NavLink>
                                <button
                                    onClick={() => {
                                        setId(trx.id);
                                        openModal("delete-transaction");
                                    }}
                                    className="btn btn-error btn-sm flex-1"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
