import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { productType } from "../../../types/productType";

type props = {
    product: productType;
}

export function StatusAndOperationHours({ product }: props) {

    const getStatusBadge = (status: boolean, label: string) => {
        return (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${status
                ? 'bg-success bg-opacity-20 text-success-content'
                : 'bg-error bg-opacity-20 text-error-content'
                }`}>
                {status ? <CheckCircle size={16} /> : <XCircle size={16} />}

                {label}
            </div>
        );
    };

    return <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6">
        <h3 className="text-lg font-semibold text-base-content mb-4">Status & Operation</h3>
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-medium text-base-content mb-3">Product Status</h4>
                <div className="space-y-2">
                    {getStatusBadge(product.buyer_product_status, 'Buyer Status')}
                    {getStatusBadge(product.seller_product_status, 'Seller Status')}
                </div>
            </div>

            <div>
                <h4 className="font-medium text-base-content mb-3">Operation Hours</h4>
                <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-base-content opacity-70" />
                    <span className="font-medium text-base-content">{product.start_cut_off} - {product.end_cut_off}</span>
                </div>
                <p className="text-sm text-base-content opacity-70 mt-1">Waktu operasional untuk transaksi</p>
            </div>
        </div>
    </div>
}