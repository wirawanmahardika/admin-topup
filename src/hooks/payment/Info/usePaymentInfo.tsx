import { useEffect, useReducer, useState } from "react"
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast"
import { paymentInfoReducer } from "./reducer"
import { AxiosAuth } from "../../../utils/axios"

export const usePaymentInfo = () => {
    const [payments, dispatch] = useReducer(paymentInfoReducer, [])
    const [id, setId] = useState("")

    useEffect(() => {
        AxiosAuth.get("/payments").then(res => { dispatch({ type: "get-all", payload: res.data.data }) })
    }, [])

    const handleHapusPayment = async (id: string) => {
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.delete("/payment/" + id)
            dispatch({ type: "delete", payload: id })
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    }
    return { payments, paymentInfoReducer, id, setId, handleHapusPayment }
}