import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs"
import * as XLSX from "xlsx";
import type { transactionType } from "../../types/transactionType";
import { AxiosAuth } from "../../utils/axios";

// Badge untuk topup_status
function TopupStatusBadge({ status }: { status: transactionType["topup_status"] }) {
    if (status === "sukses")
        return <span className="badge badge-success">Berhasil</span>;
    if (status === "pending")
        return <span className="badge badge-warning">Pending</span>;
    return <span className="badge badge-error">Gagal</span>;
}

// Badge untuk payment_status sesuai style Midtrans
function PaymentStatusBadge({ status }: { status: transactionType["payment_status"] }) {
    switch (status) {
        case "settlement":
        case "capture":
            return <span className="badge badge-success">Berhasil</span>;
        case "pending":
            return <span className="badge badge-warning">Pending</span>;
        case "deny":
        case "cancel":
        case "expire":
        case "failure":
            return <span className="badge badge-error capitalize">{status}</span>;
        case "refund":
        case "partial_refund":
            return <span className="badge badge-info capitalize">{status.replace("_", " ")}</span>;
        default:
            return <span className="badge badge-ghost">{status}</span>;
    }
}

export default function TransaksiInfo() {
    const [transactions, setTransactions] = useState<transactionType[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"" | transactionType["topup_status"]>("");

    useEffect(() => {
        AxiosAuth.get("/transactions")
            .then(res => { setTransactions(res.data.data); })
    }, [])

    // Filter transaksi berdasarkan pencarian dan status
    const filtered = useMemo(() => {
        return transactions.filter(trx =>
            (
                trx.customer_number.toLowerCase().includes(search.toLowerCase()) ||
                trx.id.toLowerCase().includes(search.toLowerCase()) ||
                trx.id_brand.toLowerCase().includes(search.toLowerCase())
            ) &&
            (statusFilter === "" || trx.topup_status === statusFilter)
        )
    }, [search, transactions, statusFilter]);

    // Fungsi untuk export ke XLSX
    const handleExportXLSX = () => {
        const data = filtered.map(trx => ({
            "ID": trx.id,
            "Nomor Customer": trx.customer_number,
            "Brand": trx.brand?.name,
            "Profit": trx.profit,
            "Operator": trx.brand?.operator ?? "-",
            "Payment Status": trx.payment_status,
            "Topup Status": trx.topup_status,
            "Tanggal Dibuat": trx.created_at,
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transaksi");
        XLSX.writeFile(wb, "transaksi-topup.xlsx");
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 className="text-xl font-bold">Daftar Transaksi</h2>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                    <input
                        type="text"
                        className="input input-bordered"
                        placeholder="Cari ID, Brand, atau Customer"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        className="select select-bordered"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value as transactionType["topup_status"] | "")}
                    >
                        <option value="">Semua Status</option>
                        <option value="sukses">Berhasil</option>
                        <option value="pending">Pending</option>
                        <option value="gagal">Gagal</option>
                    </select>
                    <button className="btn btn-success" onClick={handleExportXLSX}>
                        Unduh XLSX
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
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
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="text-center text-gray-400">Belum ada transaksi</td>
                            </tr>
                        ) : (
                            filtered.map((trx) => (
                                <tr key={trx.id}>
                                    <td>{trx.id}</td>
                                    <td>{trx.customer_number}</td>
                                    <td>{trx.product?.product_name}</td>
                                    <td>{trx.brand?.name}</td>
                                    <td>Rp {trx.profit.toLocaleString()}</td>
                                    <td>{dayjs(trx.created_at).format("D MMMM YYYY, HH:mm ")}</td>
                                    <td>
                                        <span className={`badge ${trx.brand?.operator === "sistem" ? "badge-info" : "badge-secondary"}`}>
                                            {trx.brand?.operator === "sistem" ? "Sistem" : "Manual"}
                                        </span>
                                    </td>
                                    <td><PaymentStatusBadge status={trx.payment_status} /></td>
                                    <td><TopupStatusBadge status={trx.topup_status} /></td>
                                    <td>
                                        <div className="flex gap-x-2">
                                            <div className="btn btn-primary">Edit</div>
                                            <div className="btn btn-error">Hapus</div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}