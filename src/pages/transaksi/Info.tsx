import { ToastContainer } from "react-toastify";
import { Pagination } from "../../components/Pagination"; // Import komponen pagination
import { useTransactions } from "../../hooks/transaksi/Info/useTransaction";
import { useTransactionFilters } from "../../hooks/transaksi/Info/useTransactionFilter";
import { exportTransactionsToXLSX } from "../../utils/transaksi/Info/exportUtils";
import { TransactionFilters } from "../../components/transaksi/Info/TransactionFilters";
import { TransactionTable } from "../../components/transaksi/Info/TransactionTable";

export default function TransaksiInfo() {
    const { 
        transactions, 
        isLoading, 
        updateTopupStatus, 
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

    const handleExportXLSX = () => {
        // Export semua, bukan hanya halaman saat ini
        exportTransactionsToXLSX(filteredTransactions);
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
                onUpdateTopupStatus={updateTopupStatus}
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
