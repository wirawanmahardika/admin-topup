import { ToastContainer } from 'react-toastify';
import { InformasiTransaksi } from '../../components/transaksi/Detail/InformasiTransaksi';
import { ProductInformation } from '../../components/transaksi/Detail/ProductInformation';
import { BrandInformation } from '../../components/transaksi/Detail/BrandInformation';
import { StatusCard } from '../../components/transaksi/Detail/StatusCard';
import { FinancialSummary } from '../../components/transaksi/Detail/FinancialSummary';
import { Header } from '../../components/transaksi/Detail/Header';
import { useTransactionDetail } from '../../hooks/transaksi/Detail/useTransactionDetail';
import { TransaksiDetailActions } from '../../components/transaksi/Detail/TransaksiDetailActions';


const TransactionDetailPage = () => {
    const { id, transactionData, setTransactionData, formatCurrency } = useTransactionDetail()

    return (
        <div className="bg-base-100">
            <ToastContainer />
            <Header transactionData={transactionData} />

            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <InformasiTransaksi transactionData={transactionData} formatCurrency={formatCurrency} />
                        <ProductInformation transactionData={transactionData} formatCurrency={formatCurrency} />
                        <BrandInformation transactionData={transactionData} formatCurrency={formatCurrency} />
                    </div>

                    {/* Right Column - Status & Actions */}
                    <div className="space-y-6">
                        <StatusCard id={id} transactionData={transactionData} formatCurrency={formatCurrency} setTransactionData={setTransactionData} />
                        <FinancialSummary id={id} transactionData={transactionData} formatCurrency={formatCurrency} />
                        <TransaksiDetailActions id={id} setTransactionData={setTransactionData} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TransactionDetailPage;