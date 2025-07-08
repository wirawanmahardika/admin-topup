import { useState } from "react";

type ProfilType = {
    nama: string;
    nama_usaha: string;
};

const MOCK_PROFIL: ProfilType = {
    nama: "Budi Santoso",
    nama_usaha: "TopupStore.id",
};

export default function EditProfil() {
    const [form, setForm] = useState<ProfilType>(MOCK_PROFIL);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1000); // Simulasi update profil
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh] bg-base-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-lg border border-base-300"
            >
                <h2 className="text-2xl font-bold text-primary mb-6 text-center">Edit Profil</h2>
                <div className="mb-4">
                    <label className="block font-semibold mb-1 text-gray-600">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        className="input input-bordered w-full"
                        value={form.nama}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block font-semibold mb-1 text-gray-600">Nama Usaha</label>
                    <input
                        type="text"
                        name="nama_usaha"
                        className="input input-bordered w-full"
                        value={form.nama_usaha}
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