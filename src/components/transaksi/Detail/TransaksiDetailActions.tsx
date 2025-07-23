import { FileText } from "lucide-react"
import { useState } from "react"
import { AxiosAuth } from "../../../utils/axios"
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast"
import type { transactionType } from "../../../types/transactionType"

type props = {
    id?: string
    setTransactionData: React.Dispatch<React.SetStateAction<transactionType>>
}

export const TransaksiDetailActions = ({ id, setTransactionData }: props) => {
    const [refundReason, setRefundReason] = useState('')
    const [openReasonInput, setOpenReasonInput] = useState(false)

    const handleRefund = async () => {
        if (!openReasonInput) return setOpenReasonInput(true)
        const idToast = loadingToast()

        try {
            const res = await AxiosAuth.patch(`/transaction/${id}/payment/refund`, { reason: refundReason })
            loadingSuccessToast(idToast, res.data.message)
            setTransactionData(prev => ({ ...prev, payment_status: "refund" }))
            setTransactionData(prev => ({ ...prev, topup_status: "Gagal" }))
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        } finally {
            setOpenReasonInput(false)
            setRefundReason("")
        }
    }

    const handleCancelTransaksi = async () => {
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.patch(`/transaction/${id}/payment/cancel`)
            loadingSuccessToast(idToast, res.data.message)
            setTransactionData(prev => ({ ...prev, payment_status: "cancel" }))
            setTransactionData(prev => ({ ...prev, topup_status: "Gagal" }))
        } catch (error: any) {
            console.log(error);
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    }

    return < div className="card bg-base-200 shadow-xl" >
        <div className="card-body">
            <h2 className="card-title mb-4">
                <FileText className="w-5 h-5" />
                Aksi
            </h2>

            <div className="space-y-3">
                <button className="btn btn-error w-full" onClick={handleCancelTransaksi}>
                    Cancel Transaksi
                </button>
                <button className="btn btn-info w-full" onClick={handleRefund}>
                    {openReasonInput ? "Submit Refund" : "Refund"}
                </button>

                {openReasonInput && <textarea
                    onChange={(e) => setRefundReason(e.target.value)}
                    className="textarea w-full"
                    placeholder="Masukkan alasan refund...">
                </textarea>}
            </div>
        </div>
    </div >
}