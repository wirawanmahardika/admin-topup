import { useState } from "react";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { AxiosAuth } from "../../../utils/axios";

type Product = {
    product_name: string;
    resell_price: number;
    price: number;
    unlimited_stock: boolean;
    digiflazz_product: boolean;
};

export const useBrandForm = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [popularity, setPopularity] = useState(0);
    const [tab, setTab] = useState<"thirdparty" | "manual">("thirdparty");
    const [products, setProducts] = useState<Product[]>([]);
    const [manualProducts, setManualProducts] = useState<Product[]>([]);
    const [manualInput, setManualInput] = useState<Product>({
        product_name: "",
        resell_price: 0,
        price: 0,
        unlimited_stock: true,
        digiflazz_product: false,
    });
    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const handleLoadProducts = async (brandName: string) => {
        if (!brandName) return;
        setLoadingProducts(true);
        const idToast = loadingToast(`Sedang mengambil data produk dengan brand ${brandName}`);
        try {
            const res = await AxiosAuth.get("/products/digiflazz", { params: { brand: brandName } });
            const arr = (res.data.data as any[]).map((p: any) => ({
                product_name: p.product_name,
                resell_price: 0,
                price: p.price,
                unlimited_stock: p.unlimited_stock ?? true,
                digiflazz_product: true,
            }));
            setProducts(arr);
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
        if (!manualInput.product_name || manualInput.resell_price <= 0) return;
        setManualProducts((prev) => [...prev, { ...manualInput }]);
        setManualInput({
            product_name: "",
            resell_price: 0,
            price: 0,
            unlimited_stock: true,
            digiflazz_product: false,
        });
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
