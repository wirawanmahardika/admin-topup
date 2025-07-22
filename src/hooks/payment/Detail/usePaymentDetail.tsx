import { useEffect, useState } from "react"
import { AxiosAuth } from "../../../utils/axios"
import { useParams } from "react-router-dom"
import { paymentDefault, type PaymentType } from "../../../types/paymentType"

export const usePaymentDetail = () => {
    const { id } = useParams()
    const [payment, setPayment] = useState<PaymentType>(paymentDefault)

    useEffect(() => {
        AxiosAuth.get("/payment/" + id)
            .then(res => {
                setPayment(res.data.data)
            })
    }, [])

    return { payment }
}