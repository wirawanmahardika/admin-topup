// hooks/useTransactions.ts
import { useEffect, useState } from "react";
import { AxiosAuth } from "../../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast, warnToast } from "../../../utils/toast";
import type { transactionType } from "../../../types/transactionType";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<transactionType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTransactions = async () => {
        setIsLoading(true);
        const toastId = "txError"
        try {
            const res = await AxiosAuth.get("/transactions");
            setTransactions(res.data.data);
        } catch (error: any) {
            warnToast(error.response?.data.message ?? "gagal memuat transaksi", toastId);
        } finally {
            setIsLoading(false);
        }
    };

    const updateTopupStatus = async (trxId: string, newStatus: transactionType["topup_status"]) => {
        const toastId = loadingToast("Sedang memproses update status transaksi ke " + newStatus)
        try {
            const res = await AxiosAuth.patch(`/transaction/${trxId}/topup-status`, { status: newStatus });
            setTransactions(prev => prev.map(trx => trx.id === trxId ? { ...trx, topup_status: newStatus } : trx));
            loadingSuccessToast(toastId, res.data.message);
        } catch (err) {
            loadingErrorToast(toastId, "Gagal update status!");
        }
    };

    const deleteTransaction = async (id: string) => {
        const idToast = loadingToast();
        try {
            await AxiosAuth.delete(`/transaction/${id}`);
            loadingSuccessToast(idToast, `Berhasil menghapus transaksi ${id}`);
            setTransactions(prev => prev.filter(trx => trx.id !== id));
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? `Gagal menghapus transaksi ${id}`);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return {
        transactions,
        isLoading,
        updateTopupStatus,
        deleteTransaction,
        refetch: fetchTransactions
    };
};