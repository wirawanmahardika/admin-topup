import { useEffect, useState } from "react"
import { AxiosAuth } from "../../../utils/axios"
import { useParams } from "react-router-dom"
import { transactionDataDefault, type transactionType } from "../../../types/transactionType"

export function useTransactionDetail() {
    const { id } = useParams()
    const [transactionData, setTransactionData] = useState<transactionType>(transactionDataDefault)

    useEffect(() => {
        AxiosAuth.get(`/transaction/${id}`)
            .then(res => { setTransactionData(res.data.data) })
    }, [])

    const formatCurrency = (amount?: number) => {
        if (!amount) return "";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    return { id, transactionData, setTransactionData, formatCurrency }
}