import { useState } from "react";
import * as XLSX from "xlsx";

type Transaction = {
    id: number;
    user: string;
    product: string;
    game: string;
    amount: number;
    price: number;
    status: "pending" | "success" | "failed";
    date: string;
};

const dummyTransactions: Transaction[] = [
    {
        id: 1,
        user: "Budi",
        product: "86 Diamonds",
        game: "Mobile Legends",
        amount: 1,
        price: 20000,
        status: "success",
        date: "2025-06-17 10:12",
    },
    {
        id: 2,
        user: "Siti",
        product: "70 Diamonds",
        game: "Free Fire",
        amount: 2,
        price: 30000,
        status: "pending",
        date: "2025-06-17 11:05",
    },
    {
        id: 3,
        user: "Andi",
        product: "60 UC",
        game: "PUBG Mobile",
        amount: 1,
        price: 17000,
        status: "failed",
        date: "2025-06-16 21:30",
    },
];

function StatusBadge({ status }: { status: Transaction["status"] }) {
    if (status === "success")
        return <span className="badge badge-success">Berhasil</span>;
    if (status === "pending")
        return <span className="badge badge-warning">Pending</span>;
    return <span className="badge badge-error">Gagal</span>;
}

export default function TransaksiInfo() {
    const [transactions] = useState<Transaction[]>(dummyTransactions);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"" | Transaction["status"]>("");

    // Filter transaksi berdasarkan pencarian dan status
    const filtered = transactions.filter(trx =>
        (trx.user.toLowerCase().includes(search.toLowerCase()) ||
            trx.product.toLowerCase().includes(search.toLowerCase()) ||
            trx.game.toLowerCase().includes(search.toLowerCase())) &&
        (statusFilter === "" || trx.status === statusFilter)
    );

    // Fungsi untuk export ke XLSX
    const handleExportXLSX = () => {
        const data = filtered.map(trx => ({
            "User": trx.user,
            "Produk": trx.product,
            "Game": trx.game,
            "Jumlah": trx.amount,
            "Harga": trx.price,
            "Status": trx.status,
            "Tanggal": trx.date,
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
                        placeholder="Cari user, produk, atau game"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        className="select select-bordered"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value as Transaction["status"] | "")}
                    >
                        <option value="">Semua Status</option>
                        <option value="success">Berhasil</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Gagal</option>
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
                            <th>#</th>
                            <th>User</th>
                            <th>Produk</th>
                            <th>Game</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                            <th>Status</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center text-gray-400">Belum ada transaksi</td>
                            </tr>
                        ) : (
                            filtered.map((trx, idx) => (
                                <tr key={trx.id}>
                                    <td>{idx + 1}</td>
                                    <td>{trx.user}</td>
                                    <td>{trx.product}</td>
                                    <td>{trx.game}</td>
                                    <td>{trx.amount}</td>
                                    <td>Rp {trx.price.toLocaleString()}</td>
                                    <td><StatusBadge status={trx.status} /></td>
                                    <td>{trx.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}