// hooks/useTransactionFilters.ts
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

    const filteredTransactions = useMemo(() => {
        return transactions.filter(trx => {
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
    }, [transactions, filters]);

    const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        filters,
        filteredTransactions,
        updateFilter
    };
};
