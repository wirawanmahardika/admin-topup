import { Package } from "lucide-react";
import type { transactionType } from "../../../types/transactionType";

type props = {
    transactionData: transactionType;
    formatCurrency: (amount?: number) => string
}

export function ProductInformation({ transactionData, formatCurrency }: props) {
    return <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
            <h2 className="card-title mb-6">
                <Package className="w-5 h-5" />
                Informasi Produk
            </h2>

            <div className="flex items-start space-x-4">
                <div className="avatar">
                    <div className="w-16 h-16 rounded-xl bg-base-300">
                        <img
                            src={transactionData.brand?.image || undefined}
                            alt={transactionData.brand?.name}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">
                        {transactionData.product?.product_name}
                    </h3>
                    <p className="text-base-content/70 mb-4">{transactionData.product?.desc}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="stat bg-base-100 rounded-lg p-3">
                            <div className="stat-title text-xs">Kategori</div>
                            <div className="stat-value text-sm">{transactionData.product?.category}</div>
                        </div>
                        <div className="stat bg-base-100 rounded-lg p-3">
                            <div className="stat-title text-xs">Tipe</div>
                            <div className="stat-value text-sm">{transactionData.product?.type}</div>
                        </div>
                        <div className="stat bg-base-100 rounded-lg p-3">
                            <div className="stat-title text-xs">Harga Jual</div>
                            <div className="stat-value text-sm">{formatCurrency(transactionData.product?.resell_price)}</div>
                        </div>
                        <div className="stat bg-base-100 rounded-lg p-3">
                            <div className="stat-title text-xs">Harga Beli</div>
                            <div className="stat-value text-sm">{formatCurrency(transactionData.product?.price)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}