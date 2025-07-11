import { useMemo, useState } from "react";
import type { transactionType } from "../../../types/transactionType";

interface FilterState {
    search: string;
    statusFilter: "" | transactionType["topup_status"];
    operatorFilter: "" | "sistem" | "manual";
    paymentStatusFilter: string;
}

export const useTransactionFilters = (transactions: transactionType[]) => {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        statusFilter: "",
        operatorFilter: "",
        paymentStatusFilter: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Atur sesuai kebutuhan

    const filteredTransactions = useMemo(() => {
        const filtered = transactions.filter(trx => {
            const matchesSearch = 
                trx.customer_number.toLowerCase().includes(filters.search.toLowerCase()) ||
                trx.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                trx.id_brand.toLowerCase().includes(filters.search.toLowerCase()) ||
                trx.brand?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                trx.product?.product_name?.toLowerCase().includes(filters.search.toLowerCase());

            const matchesStatus = filters.statusFilter === "" || trx.topup_status === filters.statusFilter;
            const matchesOperator = filters.operatorFilter === "" || trx.brand?.operator === filters.operatorFilter;
            const matchesPaymentStatus = filters.paymentStatusFilter === "" || trx.payment_status === filters.paymentStatusFilter;

            return matchesSearch && matchesStatus && matchesOperator && matchesPaymentStatus;
        });

        return filtered;
    }, [transactions, filters]);

    // Pagination logic
    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredTransactions.slice(start, end);
    }, [filteredTransactions, currentPage, itemsPerPage]);

    const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setCurrentPage(1); // reset ke halaman pertama setiap kali filter berubah
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        filters,
        filteredTransactions: paginatedTransactions,
        updateFilter,
        currentPage,
        setCurrentPage,
        totalPages: Math.ceil(filteredTransactions.length / itemsPerPage)
    };
};
