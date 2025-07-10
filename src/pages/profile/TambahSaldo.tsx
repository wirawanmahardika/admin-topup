import { useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

const bankList = ["BCA", "BNI", "BRI", "MANDIRI",];

export default function TambahSaldo() {
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
            console.log(res.data.data,  { amount: Number(amount), Bank: bank });
            
            setStep(2);
        } catch (error: any) {
            console.log(error);
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan");
        }
    };

    const selectedBank = bankList.find(b => b === bank);

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-md mx-auto">
            <ToastContainer />
            <h2 className="text-xl font-bold mb-4">Tambah Saldo</h2>
            {step === 1 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Jumlah Deposit</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            name="amount"
                            min={200000}
                            placeholder="Masukkan jumlah (min. 10.000)"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Transfer ke Bank</label>
                        <select
                            className="select select-bordered w-full"
                            value={bank}
                            onChange={e => setBank(e.target.value)}
                        >
                            {bankList.map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">Lanjut</button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <div className="alert alert-info">
                        <span>
                            Silakan transfer ke rekening <b>{selectedBank}</b>
                        </span>
                    </div>
                    <div>
                        <div className="font-medium mb-1">Jumlah yang harus ditransfer:</div>
                        <div className="text-2xl font-bold text-primary">
                            Rp {(amountDeposit).toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium mb-1">Berita Transfer:</div>
                        <div className="bg-base-200 rounded p-2 select-all">
                            {uniqueCode}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            Mohon transfer sesuai nominal dan cantumkan berita transfer di atas.
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-secondary" onClick={() => setStep(1)}>
                            Kembali
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}