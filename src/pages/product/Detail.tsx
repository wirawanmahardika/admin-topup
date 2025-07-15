import { useEffect, useState } from 'react';
import {
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Tag,
    Zap,
    Building
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { AxiosAuth } from '../../utils/axios';
import type { productType } from '../../types/productType';

// Sample data untuk demo
const sampleProduct: productType = {
    id: "prod_001",
    id_brand: "brand_001",
    digiflazz_product: true,
    product_name: "Pulsa Telkomsel 50.000",
    category: "Pulsa",
    type: "Prepaid",
    seller_name: "Digital Store Indonesia",
    price: 49500,
    resell_price: 50000,
    buyer_sku_code: "TSEL50",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: false,
    stock: 150,
    multi: true,
    start_cut_off: "06:00",
    end_cut_off: "23:00",
    desc: "Pulsa Telkomsel 50.000 dengan proses otomatis dan instan. Berlaku untuk semua nomor Telkomsel di seluruh Indonesia. Pulsa akan masuk dalam 1-5 menit setelah pembayaran berhasil.",
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-07-15T10:15:00Z",
    brand_info: {
        id: "",
        operator: "",
        popularity: 0,
        created_at: "",
        updated_at: "",
        name: "",
        image: "",
        input_fields: []
    }
};

const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<productType>(sampleProduct)

    useEffect(() => {
        AxiosAuth.get("/product/" + id)
            .then(res => {
                console.log(res.data.data);
                setProduct(res.data.data);

            })
    }, [])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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

    const profit = product.resell_price - product.price;
    const profitPercentage = ((profit / product.price) * 100).toFixed(1);

    return (
        <div className="mx-auto p-6 bg-base-100" data-theme="dark">
            {/* Header */}
            <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 mb-6">
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

                        {product.digiflazz_product && (
                            <div className="flex items-center gap-2 bg-primary bg-opacity-20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                <Zap size={16} />
                                Digiflazz Product
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Left Column - Product Info */}
                <div className="w-full space-y-4">
                    {/* Price & Stock Card */}
                    <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6">
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

                    {/* Status & Operation Hours */}
                    <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6">
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

                    {/* Product Description */}
                    <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6">
                        <h3 className="text-lg font-semibold text-base-content mb-4">Product Description</h3>
                        <p className="text-base-content opacity-80 leading-relaxed">{product.desc}</p>
                    </div>

                    {/* Technical Details */}
                    <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 p-6">
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
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;