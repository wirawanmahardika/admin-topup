import { useEffect, useState } from "react";
import type { paymentFeeType } from "../../../types/paymentFeeType";
import { AxiosAuth } from "../../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { useParams } from "react-router-dom";
import type { PaymentType } from "../../../types/paymentType";

export const useEditPayment = () => {
    const { id } = useParams();
    const [paymentType, setPaymentType] = useState("")
    const [payment, setPayment] = useState<PaymentType>();
    const [paymentIsActive, setPaymentIsActive] = useState(false);
    const [fees, setFees] = useState<{ amount: number; is_percentage: boolean }[]>([]);

    useEffect(() => {
        AxiosAuth.get("/payment/" + id).then((res) => {
            const data = res.data.data;
            setPayment(data);
            setPaymentType(data.type)
            setPaymentIsActive(data.active);
            setFees(data.payment_fees?.map((f: paymentFeeType) => ({
                amount: f.amount,
                is_percentage: f.is_percentage
            })) || []);
        });
    }, [id]);

    const handleFeeChange = (index: number, field: string, value: any) => {
        const updated = [...fees];
        updated[index] = { ...updated[index], [field]: value };
        setFees(updated);
    };

    const addFee = () => {
        setFees([...fees, { amount: 0, is_percentage: false }]);
    };

    const removeFee = (index: number) => {
        const updated = fees.filter((_, i) => i !== index);
        setFees(updated);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) return;

        const formData = new FormData(e.currentTarget);
        formData.append("active", String(paymentIsActive));
        formData.append("payment_fees", JSON.stringify(fees));

        const idToast = loadingToast();
        const isValidFees = fees.every(f => typeof f.amount === 'number' && !isNaN(f.amount));
        if (!isValidFees) {
            loadingErrorToast(idToast, "Nominal fee harus berupa angka yang valid.");
            return;
        }
        try {
            const res = await AxiosAuth.put("/payment/" + id, formData);
            loadingSuccessToast(idToast, res.data.message);
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan");
        }
    };

    return {
        payment, handleSubmit, addFee, removeFee, handleFeeChange, paymentType,
        paymentIsActive, setPaymentIsActive, setPaymentType, fees
    }
}