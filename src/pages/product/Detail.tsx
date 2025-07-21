import { PriceAndStock } from '../../components/product/Detail/PriceAndStock';
import { StatusAndOperationHours } from '../../components/product/Detail/StatusAndOperationHours';
import { TechnicalDetails } from '../../components/product/Detail/TechnicalDetails';
import { HeaderProductDetail } from '../../components/product/Detail/Header';
import { useProductDetail } from '../../hooks/product/Detail/useProductDetail';

const ProductDetail = () => {
    const { product, formatCurrency } = useProductDetail()

    return (
        <div className="mx-auto p-6 bg-base-100" data-theme="dark">
            <HeaderProductDetail product={product} />

            <div className="flex">
                <div className="w-full space-y-4">
                    <PriceAndStock product={product} formatCurrency={formatCurrency} />
                    <StatusAndOperationHours product={product} />

                    <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6">
                        <h3 className="text-lg font-semibold text-base-content mb-4">Product Description</h3>
                        <p className="text-base-content opacity-80 leading-relaxed">{product.desc}</p>
                    </div>

                    <TechnicalDetails product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;