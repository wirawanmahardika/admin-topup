import { Building, Package, Tag } from "lucide-react";
import type { productType } from "../../../types/productType";

type props = {
    product: productType;
}

export function HeaderProductDetail({ product }: props) {
    return <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 mb-6">
        <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    {product.brand_info && (
                        <img
                            src={product.brand_info.image}
                            alt={product.brand_info.name}
                            className="w-16 h-16 rounded-lg object-cover border border-base-300"
                        />
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-base-content mb-2">
                            {product.product_name}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-base-content opacity-70">
                            <div className="flex items-center gap-1">
                                <Tag size={16} />
                                <span>{product.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Package size={16} />
                                <span>{product.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Building size={16} />
                                <span>{product.seller_name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}