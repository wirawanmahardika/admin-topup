// hooks/useProducts.ts
import { useEffect, useReducer, useState } from "react";
import { productReducer } from "../../reducer/product";
import { AxiosAuth } from "../../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";

export const useProducts = () => {
    const [products, dispatch] = useReducer(productReducer, []);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await AxiosAuth.get("/products");
            dispatch({ type: "get-all", payload: res.data.data });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (productId: string) => {
        const idToast = loadingToast();
        try {
            const res = await AxiosAuth.delete(`/product/${productId}`);
            dispatch({ type: "delete", payload: productId });
            loadingSuccessToast(idToast, res.data.message);
            return true;
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Terjadi kesalahan ketika menghapus product");
            return false;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        isLoading,
        deleteProduct,
        refetch: fetchProducts
    };
};