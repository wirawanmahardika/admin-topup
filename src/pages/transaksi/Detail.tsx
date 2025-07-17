import { useEffect, useState } from 'react';
import {
    ArrowLeft, Package, CreditCard, Clock,
    CheckCircle, XCircle, AlertCircle,
    Copy, Calendar, DollarSign, Tag,
    Building2, Phone, Code
} from 'lucide-react';
import { AxiosAuth } from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { loadingErrorToast, loadingSuccessToast, loadingToast } from '../../utils/toast';
import { ToastContainer } from 'react-toastify';

// Sample transaction data
const transactionDataDefault = {
    id: "",
    id_product: "",
    id_brand: "",
    customer_number: "",
    buyer_sku_code: "",
    profit: 0,
    payment_status: "",
    topup_status: "",
    created_at: "",
    updated_at: "",
    brand: {
        id: "",
        name: "",
        image: "",
        operator: "",
        popularity: 0,
        created_at: "",
        updated_at: ""
    },
    product: {
        id: "",
        id_brand: "",
        digiflazz_product: false,
        product_name: "",
        category: "",
        type: "",
        seller_name: "",
        price: 0,
        resell_price: 0,
        buyer_sku_code: "",
        buyer_product_status: false,
        seller_product_status: false,
        unlimited_stock: false,
        stock: 0,
        multi: false,
        start_cut_off: "",
        end_cut_off: "",
        desc: "",
        created_at: "",
        updated_at: ""
    }
};

const TransactionDetailPage = () => {
    const { id } = useParams()
    const [copied, setCopied] = useState(false);
    const [transactionData, setTransactionData] = useState(transactionDataDefault)

    useEffect(() => {
        AxiosAuth.get(`/transaction/${id}`)
            .then(res => { setTransactionData(res.data.data) })
    }, [])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'capture':
            case 'sukses':
            case 'success':
            case 'settlement':
                return 'badge-success';
            case 'pending':
            case 'Pending':
                return 'badge-warning';
            default:
                return 'badge-error';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success':
            case 'sukses':
            case 'capture':
            case 'settlement':
                return <CheckCircle className="w-4 h-4" />;
            case 'pending':
                return <AlertCircle className="w-4 h-4" />;
            case 'failed':
            case 'gagal':
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const handleRefreshStatus = async (type: "topup" | "payment") => {
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.get(`/transaction/${id}/${type}-status`)
            switch (type) {
                case "topup":
                    setTransactionData(prev => ({ ...prev, topup_status: res.data.data.status }))
                    break;
                case "payment":
                    setTransactionData(prev => ({ ...prev, payment_status: res.data.data.status, topup_status: res.data.data.topup_status }))
                    break
            }
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-base-100">
            <ToastContainer />
            {/* Header */}
            <div className="navbar bg-base-200 shadow-lg">
                <div className="navbar-start">
                    <button className="btn btn-ghost btn-square">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="ml-4">
                        <h1 className="text-xl font-bold">Detail Transaksi</h1>
                        <p className="text-sm text-base-content/70">#{transactionData.id}</p>
                    </div>
                </div>
                <div className="navbar-end">
                    <button
                        onClick={() => copyToClipboard(transactionData.id)}
                        className="btn btn-outline btn-sm gap-2"
                    >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy ID'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Transaction Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Transaction Overview */}
                        <div className="card bg-base-200 shadow-xl">
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
                                                    <Phone className="size-5 m-auto" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-base-content/70">Nomor Pelanggan</p>
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

                        {/* Product Information */}
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title mb-6">
                                    <Package className="w-5 h-5" />
                                    Informasi Produk
                                </h2>

                                <div className="flex items-start space-x-4">
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-xl bg-base-300">
                                            <img
                                                src={transactionData.brand?.image}
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

                        {/* Brand Information */}
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title mb-6">
                                    <Building2 className="w-5 h-5" />
                                    Informasi Brand
                                </h2>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="avatar">
                                            <div className="w-12 h-12 rounded-full bg-base-300">
                                                <img
                                                    src={transactionData.brand?.image}
                                                    alt={transactionData.brand?.name}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{transactionData.brand?.name}</h3>
                                            <p className="text-base-content/70">Operator: {transactionData.brand?.operator}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="stat">
                                            <div className="stat-title text-xs">Popularitas</div>
                                            <div className="stat-value text-lg">{transactionData.brand?.popularity}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Status & Actions */}
                    <div className="space-y-6">
                        {/* Status Cards */}
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title mb-4">
                                    <CreditCard className="w-5 h-5" />
                                    Status Transaksi
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-base-content/70">Status Pembayaran</span>
                                        <div className="flex flex-col gap-y-3">
                                            <div className={`badge ${getStatusBadge(transactionData.payment_status)} gap-1`}>
                                                {getStatusIcon(transactionData.payment_status)}
                                                <span className="capitalize">{transactionData.payment_status}</span>
                                            </div>
                                            <button onClick={() => handleRefreshStatus("payment")} className='btn btn-primary btn-xs'>Refresh</button>
                                        </div>
                                    </div>

                                    <div className="divider my-2"></div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-base-content/70">Status Topup</span>
                                        <div className="flex flex-col gap-y-3">
                                            <div className={`badge ${getStatusBadge(transactionData.topup_status)} gap-1`}>
                                                {getStatusIcon(transactionData.topup_status)}
                                                <span className="capitalize">{transactionData.topup_status}</span>
                                            </div>
                                            <button disabled={
                                                ["pending", "deny", "cancel", "expire", "failure", "refund", "partial_refund"]
                                                    .some(v => v === transactionData.payment_status.toLowerCase())
                                            }
                                                onClick={() => handleRefreshStatus("topup")} className='btn btn-primary btn-xs'>
                                                Refresh
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="card bg-base-200 shadow-xl">
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

                        {/* Actions */}
                        {/* <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title mb-4">
                                    <FileText className="w-5 h-5" />
                                    Aksi
                                </h2>

                                <div className="space-y-3">
                                    <button className="btn btn-primary w-full">
                                        Lihat Detail Lengkap
                                    </button>
                                    <button className="btn btn-outline w-full">
                                        Export Data
                                    </button>
                                    <button className="btn btn-warning w-full">
                                        Hubungi Customer
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TransactionDetailPage;