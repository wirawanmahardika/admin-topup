import { ToastContainer } from "react-toastify";
import { Pagination } from "../../components/Pagination"; // Import komponen pagination
import { useTransactions } from "../../hooks/transaksi/Info/useTransaction";
import { useTransactionFilters } from "../../hooks/transaksi/Info/useTransactionFilter";
import { TransactionFilters } from "../../components/transaksi/Info/TransactionFilters";
import { TransactionTable } from "../../components/transaksi/Info/TransactionTable";
import { AxiosAuth } from "../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";

export default function TransaksiInfo() {
    const {
        transactions,
        isLoading,
        deleteTransaction
    } = useTransactions();

    const {
        filters,
        filteredTransactions,
        updateFilter,
        currentPage,
        setCurrentPage,
        totalPages
    } = useTransactionFilters(transactions);

    const handleExportXLSX = async () => {
        const idToast = loadingToast("Downloading...")
        try {
            const res = await AxiosAuth.get("/transactions/report", { responseType: "blob" })
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "laporan transaksi.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            loadingSuccessToast(idToast, "Berhasil download")
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Tidak dapat mendownload, terjadi kesalahan")
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <ToastContainer />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 className="text-xl font-bold">Daftar Transaksi</h2>

                <TransactionFilters
                    search={filters.search}
                    statusFilter={filters.statusFilter}
                    operatorFilter={filters.operatorFilter}
                    paymentStatusFilter={filters.paymentStatusFilter}
                    onSearchChange={value => updateFilter('search', value)}
                    onStatusFilterChange={value => updateFilter('statusFilter', value)}
                    onOperatorFilterChange={value => updateFilter('operatorFilter', value)}
                    onPaymentStatusFilterChange={value => updateFilter('paymentStatusFilter', value)}
                    onExport={handleExportXLSX}
                />
            </div>

            <TransactionTable
                transactions={filteredTransactions}
                isLoading={isLoading}
                onDeleteTransaction={deleteTransaction}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
