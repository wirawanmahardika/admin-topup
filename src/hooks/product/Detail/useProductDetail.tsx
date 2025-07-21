import { useParams } from "react-router-dom";
import { productDefault, type productType } from "../../../types/productType";
import { useEffect, useState } from "react";
import { AxiosAuth } from "../../../utils/axios";

export function useProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState<productType>(productDefault)

    useEffect(() => {
        AxiosAuth.get("/product/" + id)
            .then(res => {
                console.log(res.data.data);
                setProduct(res.data.data);

            })
    }, [])

    const formatCurrency = (amount?: number) => {
        if (!amount) return ""
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return { product, formatCurrency }
}