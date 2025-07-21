import type { productType } from "../../../types/productType";

type props = {
    product: productType;
    formatCurrency: (amount?: number) => string;
}

export function PriceAndStock({ product, formatCurrency }: props) {
    const profit = product.resell_price - product.price;
    const profitPercentage = ((profit / product.price) * 100).toFixed(1);

    return <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6">
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-semibold text-base-content mb-4">Pricing Information</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-base-content opacity-70">Harga Modal:</span>
                        <span className="font-semibold text-lg text-base-content">{formatCurrency(product.price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-base-content opacity-70">Harga Jual:</span>
                        <span className="font-semibold text-lg text-success">{formatCurrency(product.resell_price)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-base-300">
                        <span className="text-base-content opacity-70">Keuntungan:</span>
                        <div className="text-right">
                            <span className="font-semibold text-success">{formatCurrency(profit)}</span>
                            <span className="text-sm text-base-content opacity-50 ml-2">({profitPercentage}%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-base-content mb-4">Stock Information</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-base-content opacity-70">Stock Type:</span>
                        <span className={`font-medium ${product.unlimited_stock ? 'text-success' : 'text-info'}`}>
                            {product.unlimited_stock ? 'Unlimited' : 'Limited'}
                        </span>
                    </div>
                    {!product.unlimited_stock && (
                        <div className="flex justify-between items-center">
                            <span className="text-base-content opacity-70">Available Stock:</span>
                            <span className="font-semibold text-lg text-base-content">{product.stock.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-base-content opacity-70">Multi Transaction:</span>
                        <span className={`font-medium ${product.multi ? 'text-success' : 'text-error'}`}>
                            {product.multi ? 'Supported' : 'Not Supported'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}