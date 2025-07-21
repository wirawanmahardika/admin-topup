import { AlertCircle, CheckCircle, Clock, CreditCard, XCircle } from "lucide-react"
import type { transactionType } from "../../../types/transactionType";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { AxiosAuth } from "../../../utils/axios";

type props = {
    id?: string;
    transactionData: transactionType;
    setTransactionData: React.Dispatch<React.SetStateAction<transactionType>>;
    formatCurrency: (amount?: number) => string
}

export function StatusCard({ id, transactionData, setTransactionData }: props) {

    const updateTopupStatus = async (trxId: string, newStatus: transactionType["topup_status"]) => {
        const toastId = loadingToast("Sedang memproses update status transaksi ke " + newStatus)
        try {
            const res = await AxiosAuth.patch(`/transaction/${trxId}/topup-status`, { status: newStatus });
            loadingSuccessToast(toastId, res.data.message);
        } catch (err) {
            loadingErrorToast(toastId, "Gagal update status!");
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
    return <div className="card bg-base-200 shadow-xl">
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
                        {transactionData.brand?.operator === "sistem" ?
                            <button disabled={
                                ["pending", "deny", "cancel", "expire", "failure", "refund", "partial_refund"]
                                    .some(v => v === transactionData.payment_status.toLowerCase())
                            }
                                onClick={() => handleRefreshStatus("topup")} className='btn btn-primary btn-xs'>
                                Refresh
                            </button>
                            :
                            <select onChange={async e => {
                                if (id) await updateTopupStatus(id, e.target.value as transactionType["topup_status"])
                            }} className='select select-xs select-info'>
                                <option value="Sukses">Sukses</option>
                                <option value="Pending">Pending</option>
                                <option value="Gagal">Gagal</option>
                            </select>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}