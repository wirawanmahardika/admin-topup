import { useState } from "react";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { AxiosAuth } from "../../../utils/axios";

export const uesTambahPayment = () => {
    const [fees, setFees] = useState([
        { amount: 0, is_percentage: false },
    ]);

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
        const formData = new FormData(e.currentTarget);

        // Tambahkan payment_fees ke formData manual
        formData.append("payment_fees", JSON.stringify(fees));

        const idToast = loadingToast();
        try {
            const res = await AxiosAuth.post("/payment", formData);
            loadingSuccessToast(idToast, res.data.message);
        } catch (error: any) {
            loadingErrorToast(
                idToast,
                error.response?.data.message ?? "Terjadi kesalahan"
            );
        }
    };

    return {
        fees, addFee, removeFee, handleFeeChange, handleSubmit
    }
}