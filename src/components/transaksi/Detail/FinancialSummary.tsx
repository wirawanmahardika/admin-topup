import { DollarSign } from "lucide-react";
import type { transactionType } from "../../../types/transactionType";

type props = {
    id?: string;
    transactionData: transactionType;
    formatCurrency: (amount?: number) => string
}

export function FinancialSummary({ transactionData, formatCurrency }: props) {
    return <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
            <h2 className="card-title mb-4">
                <DollarSign className="w-5 h-5" />
                Ringkasan Keuangan
            </h2>

            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-base-content/70">Harga Beli</span>
                    <span className="font-medium">{formatCurrency(transactionData.product?.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-base-content/70">Harga Jual</span>
                    <span className="font-medium">{formatCurrency(transactionData.product?.resell_price)}</span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between">
                    <span className="font-medium">Total Profit</span>
                    <span className="font-bold text-success">{formatCurrency(transactionData.profit)}</span>
                </div>
            </div>
        </div>
    </div>
}