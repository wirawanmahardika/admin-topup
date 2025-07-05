// hooks/useBrands.ts
import { useEffect, useReducer, useState } from "react";
import type { brandType } from "../../../types/brandType";
import { AxiosAuth } from "../../../utils/axios";
import { loadingSuccessToast, loadingToast } from "../../../utils/toast";

function brandReducer(state: brandType[], action: { type: "get-all" | "delete", payload: brandType[] | string }) {
    switch (action.type) {
        case "get-all":
            return action.payload as brandType[];
        case "delete":
            return state.filter(b => b.id !== action.payload);
        default:
            return state;
    }
}

export const useBrands = () => {
    const [brands, dispatch] = useReducer(brandReducer, []);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<brandType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBrands = async () => {
        setIsLoading(true);
        try {
            const res = await AxiosAuth.get("/brands");
            dispatch({ type: "get-all", payload: res.data.data });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteBrand = async (id: string) => {
        const idToast = loadingToast();
        try {
            const res = await AxiosAuth.delete("/brand/" + id);
            loadingSuccessToast(idToast, res.data.message);
            dispatch({ type: "delete", payload: id });
        } catch (error: any) {
            loadingSuccessToast(idToast, error.response?.data?.message ?? "Terjadi kesalahan saat menghapus brand");
        }
    };

    const openModal = (brand: brandType) => {
        setSelectedBrand(brand);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedBrand(null);
    };

    const confirmDelete = async () => {
        if (selectedBrand) {
            await deleteBrand(selectedBrand.id);
            closeModal();
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    return {
        brands,
        isLoading,
        deleteBrand,
        modalOpen,
        selectedBrand,
        openModal,
        closeModal,
        confirmDelete
    };
};