import { useEffect, useState } from "react";
import type { profilType } from "../../../types/profileType";
import { AxiosAuth } from "../../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";

export function useProfile() {
    const [profil, setProfil] = useState<profilType | null>(null);

    useEffect(() => {
        AxiosAuth.get("/user/data").then(res => { setProfil(res.data.data) })
    }, []);

    const handleRefreshSaldo = async () => {
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.get("/user/saldo")
            setProfil(prev => {
                if (!prev) return null
                return { ...prev, saldo: res.data.data }
            })
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    }
    return { profil, handleRefreshSaldo }
}