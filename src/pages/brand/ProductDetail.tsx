import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { productType } from "../../types/productType";
import { AxiosAuth } from "../../utils/axios";
import { errorToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import type { brandType } from "../../types/brandType";
import { FilterProductDetail } from "../../components/brand/ProductDetail/FilterProductDetail";
import { TableDataProductDetail } from "../../components/brand/ProductDetail/TableData";
import { HeaderBrandProductDetail } from "../../components/brand/ProductDetail/Header";


export default function BrandProductDetail() {
    const { id } = useParams();
    const [products, setProducts] = useState<productType[]>([]);
    const [brand, setBrand] = useState<brandType | null>(null)

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [resellPrice, setResellPrice] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [id]);

    const fetchProducts = async () => {
        if (!id) return;
        try {
            const res = await AxiosAuth.get(`/brand/${id}/products`)
            setProducts(res.data.data.products || []);
            setBrand(res.data.data)
        } catch (error: any) {
            errorToast(error.response?.data?.message ?? "Gagal fetch product")
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchName = product.product_name.toLowerCase().includes(search.toLowerCase());
        const isAktif = product.unlimited_stock || product.stock > 0;
        const matchStatus = !status ||
            (status === "aktif" && isAktif) ||
            (status === "nonaktif" && !isAktif);
        const matchResell =
            !resellPrice ||
            (resellPrice === "null" && (product.resell_price === null || product.resell_price === undefined)) ||
            (resellPrice === "notnull" && product.resell_price !== null && product.resell_price !== undefined);
        return matchName && matchStatus && matchResell;
    });

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <ToastContainer />
            <HeaderBrandProductDetail brand={brand} id={id} fetchProducts={fetchProducts} />
            <FilterProductDetail resellPrice={resellPrice} search={search} setResellPrice={setResellPrice} setSearch={setSearch} setStatus={setStatus} />
            <TableDataProductDetail brand={brand} filteredProducts={filteredProducts} setProducts={setProducts} />
        </div>
    );
}