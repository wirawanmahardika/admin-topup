import { useState } from "react";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { AxiosAuth } from "../../../utils/axios";

const bankList = ["BCA", "BNI", "BRI", "MANDIRI",];

export function useTambahSaldo() {
    const [step, setStep] = useState<1 | 2>(1);
    const [amount, setAmount] = useState("");
    const [bank, setBank] = useState(bankList[0]);
    const [uniqueCode, setUniqueCode] = useState("");
    const [amountDeposit, setAmountDeposit] = useState(0)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const idToast = loadingToast("Mengambil kode deposit")
        try {
            const res = await AxiosAuth.post("/user/deposit", { amount: Number(amount), Bank: bank })
            loadingSuccessToast(idToast, res.data.message);
            setAmountDeposit(res.data.data.amount)
            setUniqueCode(res.data.data.notes)
            setStep(2);
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan");
        }
    };

    const selectedBank = bankList.find(b => b === bank);
    return { step, amount, setAmount, uniqueCode, amountDeposit, handleSubmit, bank, setBank, selectedBank, setStep }
}