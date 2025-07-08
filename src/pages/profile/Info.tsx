import { useEffect, useState } from "react";

type ProfilType = {
    nama: string;
    nama_usaha: string;
    saldo: number;
    total_pendapatan: number;
};

const MOCK_PROFIL: ProfilType = {
    nama: "Budi Santoso",
    nama_usaha: "TopupStore.id",
    saldo: 1500000,
    total_pendapatan: 12500000,
};

export default function ProfileInfo() {
    const [profil, setProfil] = useState<ProfilType | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setProfil(MOCK_PROFIL);
        }, 500);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-[60vh] bg-base-200">
            <div className="bg-white dark:bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-lg border border-base-300">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-3">
                        {profil?.nama.charAt(0) ?? "?"}
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-1">Profil Pengguna</h2>
                    <span className="text-gray-500">{profil?.nama_usaha}</span>
                </div>
                {!profil ? (
                    <div className="text-center text-gray-400 py-8">Memuat data profil...</div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-600">Nama</span>
                            <span className="text-gray-800">{profil.nama}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-600">Nama Usaha</span>
                            <span className="text-gray-800">{profil.nama_usaha}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-600">Saldo</span>
                            <span className="text-primary font-bold text-lg">
                                Rp {profil.saldo.toLocaleString("id")}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-600">Total Pendapatan</span>
                            <span className="text-success font-bold text-lg">
                                Rp {profil.total_pendapatan.toLocaleString("id")}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}