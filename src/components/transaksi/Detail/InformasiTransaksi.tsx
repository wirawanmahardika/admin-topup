import { Calendar, Clock, Code, DollarSign, Gamepad2, Package, Tag } from "lucide-react";
import type { transactionType } from "../../../types/transactionType";

type props = {
    transactionData: transactionType;
    formatCurrency: (amount?: number) => string
}

export function InformasiTransaksi({ transactionData, formatCurrency }: props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
            <h2 className="card-title mb-6">
                <Package className="w-5 h-5" />
                Informasi Transaksi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="placeholder">
                            <div className="bg-primary text-primary-content rounded-full size-12 flex items-center justify-center">
                                <Tag className="size-5 m-auto" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">Transaction ID</p>
                            <p className="font-semibold">{transactionData.id}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="placeholder">
                            <div className="bg-success text-success-content rounded-full size-12 flex items-center justify-center">
                                <Gamepad2 className="size-5 m-auto" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">ID Akun</p>
                            <p className="font-semibold">{transactionData.customer_number}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="placeholder">
                            <div className="bg-secondary text-secondary-content rounded-full size-12 flex items-center justify-center">
                                <Code className="size-5 m-auto" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">SKU Code</p>
                            <p className="font-semibold">{transactionData.buyer_sku_code}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="placeholder">
                            <div className="bg-warning text-warning-content rounded-full size-12 flex items-center justify-center">
                                <DollarSign className="size-5 m-auto" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">Profit</p>
                            <p className="font-semibold text-success">{formatCurrency(transactionData.profit)}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="placeholder">
                            <div className="bg-accent text-accent-content rounded-full size-12 flex items-center justify-center">
                                <Calendar className="size-5 m-auto" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">Tanggal Transaksi</p>
                            <p className="font-semibold">{formatDate(transactionData.created_at)}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full size-12 flex items-center justify-center">
                                <Clock className="size-5 m-auto" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-base-content/70">Terakhir Update</p>
                            <p className="font-semibold">{formatDate(transactionData.updated_at)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}