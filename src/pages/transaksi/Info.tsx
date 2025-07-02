import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs"
import * as XLSX from "xlsx";
import type { transactionType } from "../../types/transactionType";
import { AxiosAuth } from "../../utils/axios";
import { ToastContainer } from "react-toastify";
import { errorToast, loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";


function TopupStatusSelect({
    value,
    onChange,
    disabled,
}: {
    value: transactionType["topup_status"];
    onChange: (val: transactionType["topup_status"]) => void;
    disabled?: boolean;
}) {
    return (
        <select
            className={`select select-xs ${value === "sukses" ? "select-success" : value === "pending" ? "select-warning" : "select-error"}`}
            value={value}
            onChange={e => onChange(e.target.value as transactionType["topup_status"])}
            disabled={disabled}
        >
            <option value="sukses">Sukses</option>
            <option value="pending">Pending</option>
            <option value="gagal">Gagal</option>
        </select>
    );
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
    const [operatorFilter, setOperatorFilter] = useState<"" | "sistem" | "manual">("");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("");

    useEffect(() => {
        AxiosAuth.get("/transactions")
            .then(res => { setTransactions(res.data.data); })
    }, [])

    // Handler update topup_status
    const handleUpdateTopupStatus = async (trxId: string, newStatus: transactionType["topup_status"]) => {
        try {
            await AxiosAuth.patch(`/transaction/${trxId}/topup-status`, { status: newStatus });
            setTransactions(prev => prev.map(trx => trx.id === trxId ? { ...trx, topup_status: newStatus } : trx));
        } catch (err) {
            errorToast("Gagal update status!");
        }
    };

    // handle delete transaction
    const handleDeleteTransaction = async (id: string) => {
        const idToast = loadingToast()
        try {
            await AxiosAuth.delete("/transaction/" + id)
            loadingSuccessToast(idToast, "Berhasil menghapus transaksi " + id)
            setTransactions(prev => prev.filter(trx => trx.id !== id));
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Gagal menghapus transaksi " + id)
        }
    }

    // Filter transaksi berdasarkan pencarian, status, operator, dan payment status
    const filtered = useMemo(() => {
        return transactions.filter(trx =>
            (
                trx.customer_number.toLowerCase().includes(search.toLowerCase()) ||
                trx.id.toLowerCase().includes(search.toLowerCase()) ||
                trx.id_brand.toLowerCase().includes(search.toLowerCase()) ||
                trx.brand?.name?.toLowerCase().includes(search.toLowerCase()) ||
                trx.product?.product_name?.toLowerCase().includes(search.toLowerCase())
            ) &&
            (statusFilter === "" || trx.topup_status === statusFilter) &&
            (operatorFilter === "" || trx.brand?.operator === operatorFilter) &&
            (paymentStatusFilter === "" || trx.payment_status === paymentStatusFilter)
        )
    }, [search, transactions, statusFilter, operatorFilter, paymentStatusFilter]);

    // Fungsi untuk export ke XLSX
    const handleExportXLSX = () => {
        const data = filtered.map(trx => ({
            "ID": trx.id,
            "Nomor Customer": trx.customer_number,
            "Product": trx.product?.product_name,
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
            <ToastContainer />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 className="text-xl font-bold">Daftar Transaksi</h2>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                    <input
                        type="text"
                        className="input input-bordered"
                        placeholder="Cari ID, Brand, Produk, atau Customer"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        className="select select-bordered"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value as transactionType["topup_status"] | "")}
                    >
                        <option value="">Semua Topup Status</option>
                        <option value="sukses">Sukses</option>
                        <option value="pending">Pending</option>
                        <option value="gagal">Gagal</option>
                    </select>
                    <select
                        className="select select-bordered"
                        value={operatorFilter}
                        onChange={e => setOperatorFilter(e.target.value as "sistem" | "manual" | "")}
                    >
                        <option value="">Semua Operator</option>
                        <option value="sistem">Sistem</option>
                        <option value="manual">Manual</option>
                    </select>
                    <select
                        className="select select-bordered"
                        value={paymentStatusFilter}
                        onChange={e => setPaymentStatusFilter(e.target.value)}
                    >
                        <option value="">Semua Payment Status</option>
                        <option value="settlement">Berhasil</option>
                        <option value="capture">Capture</option>
                        <option value="pending">Pending</option>
                        <option value="deny">Deny</option>
                        <option value="cancel">Cancel</option>
                        <option value="expire">Expire</option>
                        <option value="failure">Failure</option>
                        <option value="refund">Refund</option>
                        <option value="partial_refund">Partial Refund</option>
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
                            filtered.map((trx) => {
                                return (
                                    <tr key={trx.id}>
                                        <td>{trx.id}</td>
                                        <td>{trx.customer_number}</td>
                                        <td>{trx.product?.product_name ?? <span className="italic text-red-300">None</span>}</td>
                                        <td>{trx.brand?.name ?? <span className="italic text-red-300">None</span>}</td>
                                        <td>Rp {trx.profit.toLocaleString()}</td>
                                        <td>{dayjs(trx.created_at).format("D MMMM YYYY, HH:mm ")}</td>
                                        <td>
                                            <span className={`badge ${trx.brand?.operator === "sistem" ? "badge-info" : "badge-secondary"}`}>
                                                {trx.brand?.operator === "sistem" ? "Sistem" : "Manual"}
                                            </span>
                                        </td>
                                        <td><PaymentStatusBadge status={trx.payment_status} /></td>
                                        <td>
                                            <TopupStatusSelect
                                                value={trx.topup_status}
                                                onChange={val => handleUpdateTopupStatus(trx.id, val)}
                                                disabled={trx.brand?.operator === "sistem"}
                                            />
                                        </td>
                                        <td>
                                            <div onClick={() => handleDeleteTransaction(trx.id)} className="btn btn-error btn-sm">Hapus</div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}