import { useEffect, useState } from "react";
import { AxiosAuth } from "../../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { productDefault, type productType } from "../../../types/productType";
import { useParams } from "react-router-dom";

export function useProductEdit() {
    const { id } = useParams()
    const [formData, setFormData] = useState<productType>(productDefault);

    const handleChange = (field: keyof productType, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    useEffect(() => {
        AxiosAuth.get("/product/" + id)
            .then(res => setFormData(res.data.data))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.put(`/product/${id}`, {
                resell_price: formData.resell_price,
                product_name: formData.product_name
            })
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data.message ?? "Gagal menambah product")
        }
    };

    return { handleChange, handleSubmit, formData}
}