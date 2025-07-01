import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import type { transactionType } from "../../types/transactionType";
import { AxiosAuth } from "../../utils/axios";

function StatusBadge({ status }: { status: transactionType["topup_status"] }) {
    if (status === "sukses")
        return <span className="badge badge-success">Berhasil</span>;
    if (status === "pending")
        return <span className="badge badge-warning">Pending</span>;
    return <span className="badge badge-error">Gagal</span>;
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
            "Nama": trx.customer_number,
            "Brand": trx.id_brand,
            "Profit": trx.profit,
            "Status": trx.topup_status,
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
                            <th>Nomor Customer</th>
                            <th>Brand</th>
                            <th>Profit</th>
                            <th>Status</th>
                            <th>Tanggal Dibuat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-400">Belum ada transaksi</td>
                            </tr>
                        ) : (
                            filtered.map((trx) => (
                                <tr key={trx.id}>
                                    <td>{trx.id}</td>
                                    <td>{trx.customer_number}</td>
                                    <td>{trx.brand?.name}</td>
                                    <td>Rp {trx.profit.toLocaleString()}</td>
                                    <td><StatusBadge status={trx.topup_status} /></td>
                                    <td>{trx.created_at}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}