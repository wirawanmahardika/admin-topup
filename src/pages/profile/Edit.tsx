import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";
import { ToastContainer } from "react-toastify";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";

type ProfilType = {
    fullname: string;
    email: string;
    saldo: number;
    password: string;
};

const PROFIL_DEFAULT: ProfilType = {
    fullname: "",
    email: "",
    saldo: 0,
    password: ""
}


export default function EditProfil() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [profil, setProfil] = useState<ProfilType>(PROFIL_DEFAULT);
    useEffect(() => {
        AxiosAuth.get("/user/data")
            .then(res => {
                setProfil(res.data.data)
            })
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfil(p => ({ ...p, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const body = {
            fullname: e.currentTarget.fullname.value,
            email: e.currentTarget.email.value,
            saldo: Number(e.currentTarget.saldo.value),
        }

        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.put('/user', body)
            loadingSuccessToast(idToast, res.data.message)
            setSuccess(true);
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh] bg-base-200">
            <ToastContainer/>
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-lg border border-base-300"
            >
                <h2 className="text-2xl font-bold text-primary mb-6 text-center">Edit Profil</h2>
                <div className="mb-4">
                    <label className="block font-semibold mb-1 text-gray-600">Nama</label>
                    <input
                        type="text"
                        name="fullname"
                        className="input input-bordered w-full"
                        value={profil.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block font-semibold mb-1 text-gray-600">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="input input-bordered w-full"
                        value={profil.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block font-semibold mb-1 text-gray-600">Saldo</label>
                    <input
                        type="text"
                        name="saldo"
                        className="input input-bordered w-full"
                        value={profil.saldo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
                {success && (
                    <div className="mt-4 text-success text-center font-semibold">
                        Profil berhasil diperbarui!
                    </div>
                )}
            </form>
        </div>
    );
}