import { useState } from "react";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { AxiosAuth } from "../../../utils/axios";

export interface Product {
    id: string;
    id_brand: string;
    brand: string;
    buyer_sku_code: string;
    category: string;
    product_name: string;
    desc: string;
    type: string;

    price: number;
    resell_price: number | null;
    stock: number;

    multi: boolean;
    unlimited_stock: boolean;
    buyer_product_status: boolean;
    seller_product_status: boolean;

    seller_name: string;

    start_cut_off: string; // format "HH:mm"
    end_cut_off: string;   // format "HH:mm"

    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
}

export const defaultProduct: Product = {
    id: "",
    id_brand: "",
    brand: "",
    buyer_sku_code: "",
    category: "",
    product_name: "",
    desc: "",
    type: "",

    price: 0,
    resell_price: null,
    stock: 0,

    multi: false,
    unlimited_stock: false,
    buyer_product_status: false,
    seller_product_status: false,

    seller_name: "",

    start_cut_off: "",
    end_cut_off: "",

    created_at: "0001-01-01T00:00:00Z",
    updated_at: "0001-01-01T00:00:00Z"
};



export const useBrandForm = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [popularity, setPopularity] = useState(0);
    const [tab, setTab] = useState<"thirdparty" | "manual">("thirdparty");
    const [products, setProducts] = useState<Product[]>([]);
    const [manualProducts, setManualProducts] = useState<Product[]>([]);
    const [manualInput, setManualInput] = useState<Product>(defaultProduct);
    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const handleLoadProducts = async (brandName: string) => {
        if (!brandName) return;
        setLoadingProducts(true);
        const idToast = loadingToast(`Sedang mengambil data produk dengan brand ${brandName}`);
        try {
            const res = await AxiosAuth.get("/products/digiflazz", { params: { brand: brandName } });
            setProducts(res.data.data);
            loadingSuccessToast(idToast, res.data.message);
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Gagal memuat produk dari third party!");
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleResellPriceChange = (idx: number, value: number) => {
        setProducts((prev) => prev.map((p, i) => (i === idx ? { ...p, resell_price: value } : p)));
    };

    const handleRemoveThirdPartyProduct = (idx: number) => {
        setProducts((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setManualInput((prev) => ({
            ...prev,
            [name]: name === "resell_price" || name === "price" ? Number(value) : value,
        }));
    };

    const handleAddManualProduct = () => {
        if (manualInput.resell_price !== null && manualInput.resell_price <= 0) return
        if (!manualInput.product_name) return;
        setManualProducts((prev) => [...prev, { ...manualInput }]);
        setManualInput(defaultProduct);
    };

    const handleRemoveManualProduct = (idx: number) => {
        setManualProducts((prev) => prev.filter((_, i) => i !== idx));
    };

    return {
        name,
        setName,
        image,
        setImage,
        popularity,
        setPopularity,
        tab,
        setTab,
        products,
        manualProducts,
        manualInput,
        loading,
        setLoading,
        loadingProducts,
        handleLoadProducts,
        handleResellPriceChange,
        handleRemoveThirdPartyProduct,
        handleManualInputChange,
        handleAddManualProduct,
        handleRemoveManualProduct,
    };
};
