import type { transactionType } from "../../../types/transactionType";

interface TransactionFiltersProps {
    search: string;
    statusFilter: "" | transactionType["topup_status"];
    operatorFilter: "" | "sistem" | "manual";
    paymentStatusFilter: string;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: "" | transactionType["topup_status"]) => void;
    onOperatorFilterChange: (value: "" | "sistem" | "manual") => void;
    onPaymentStatusFilterChange: (value: string) => void;
    onExport: () => void;
}

export const TransactionFilters = ({
    search,
    statusFilter,
    operatorFilter,
    paymentStatusFilter,
    onSearchChange,
    onStatusFilterChange,
    onOperatorFilterChange,
    onPaymentStatusFilterChange,
    onExport
}: TransactionFiltersProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <input
                type="text"
                className="input input-bordered"
                placeholder="Cari ID, Brand, Produk, atau Customer"
                value={search}
                onChange={e => onSearchChange(e.target.value)}
            />
            
            <select
                className="select select-bordered"
                value={statusFilter}
                onChange={e => onStatusFilterChange(e.target.value as transactionType["topup_status"] | "")}
            >
                <option value="">Semua Topup Status</option>
                <option value="Sukses">Sukses</option>
                <option value="Pending">Pending</option>
                <option value="Gagal">Gagal</option>
            </select>
            
            <select
                className="select select-bordered"
                value={operatorFilter}
                onChange={e => onOperatorFilterChange(e.target.value as "sistem" | "manual" | "")}
            >
                <option value="">Semua Operator</option>
                <option value="sistem">Sistem</option>
                <option value="manual">Manual</option>
            </select>
            
            <select
                className="select select-bordered"
                value={paymentStatusFilter}
                onChange={e => onPaymentStatusFilterChange(e.target.value)}
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
            
            <button className="btn btn-success" onClick={onExport}>
                Unduh XLSX
            </button>
        </div>
    );
};
