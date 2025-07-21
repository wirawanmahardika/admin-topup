import type { productType } from "../../../types/productType";

type props = {
    product: productType;
}

export function TechnicalDetails({ product }: props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6">
        <h3 className="text-lg font-semibold text-base-content mb-4">Technical Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-base-content opacity-70">Product ID:</span>
                    <span className="font-mono text-sm text-base-content">{product.id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base-content opacity-70">Brand ID:</span>
                    <span className="font-mono text-sm text-base-content">{product.id_brand}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base-content opacity-70">SKU Code:</span>
                    <span className="font-mono text-sm bg-base-200 text-base-content px-2 py-1 rounded">{product.buyer_sku_code}</span>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-base-content opacity-70">Created:</span>
                    <span className="text-sm text-base-content">{formatDate(product.created_at)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base-content opacity-70">Updated:</span>
                    <span className="text-sm text-base-content">{formatDate(product.updated_at)}</span>
                </div>
            </div>
        </div>
    </div>
}