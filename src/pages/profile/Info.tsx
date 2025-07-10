import { useEffect, useState } from "react";
import { AxiosAuth } from "../../utils/axios";

type ProfilType = {
    fullname: string;
    email: string;
    saldo: number;
    password: string;
};

export default function ProfileInfo() {
    const [profil, setProfil] = useState<ProfilType | null>(null);


    useEffect(() => {
        AxiosAuth.get("/user/data")
            .then(res => {
                setProfil(res.data.data)
            })
    }, []);

    console.log(profil);
    

    return (
        <div className="flex justify-center items-center min-h-[60vh] bg-base-200">
            <div className="bg-white dark:bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-lg border border-base-300">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-3">
                        {profil?.fullname.charAt(0) ?? "?"}
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-1">Profil Admin</h2>
                    <span className="text-gray-500">{profil?.fullname}</span>
                </div>
                {!profil ? (
                    <div className="text-center text-gray-400 py-8">Memuat data profil...</div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-600">Nama</span>
                            <span className="text-gray-400">{profil.fullname}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-600">Email</span>
                            <span className="text-gray-400">{profil.email}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-semibold text-gray-600">Saldo</span>
                            <span className="text-primary font-bold text-lg">
                                Rp {profil.saldo.toLocaleString("id")}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}