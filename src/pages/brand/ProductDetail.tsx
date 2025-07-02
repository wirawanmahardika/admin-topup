import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import type { productType } from "../../types/productType";
import { Infinity, RefreshCw } from "lucide-react";
import { AxiosAuth } from "../../utils/axios";
import { errorToast, loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import type { brandType } from "../../types/brandType";

export default function BrandProductDetail() {
    const { id } = useParams();
    const [products, setProducts] = useState<productType[]>([]);
    const [brand, setBrand] = useState<brandType | null>(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [id]);

    const fetchProducts = async () => {
        if (!id) return;
        try {
            const res = await AxiosAuth.get(`/products/${id}`)
            setProducts(res.data.data.products || []);
            setBrand(res.data.data)
        } catch (error: any) {
            errorToast(error.response?.data?.message ?? "Gagal fetch product")
        }
    };

    const handleSync = async () => {
        if (!id) return;
        setLoading(true);
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.put(`/brand/${id}/products`);
            loadingSuccessToast(idToast, res.data.message ?? "Berhasil update product dari brand " + brand?.name)
            await fetchProducts(); // refresh data setelah sync
        } catch (err: any) {
            loadingErrorToast(idToast, err.response?.data?.message ?? "Gagal update data produk!");
        }
        setLoading(false);
    };

    const handleHapus = async (id: string) => {
        const idToast = loadingToast()
        try {
            const res = await AxiosAuth.delete("/product/" + id)
            loadingSuccessToast(idToast, res.data.message)
            setProducts((v) =>  v.filter(value => value.id !== id))
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Gagal menghapus product")
        }
    }

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Produk dari Brand: {brand?.name}</h2>
                <div className="flex gap-2">
                    <button
                        className="btn btn-accent flex items-center gap-2"
                        onClick={handleSync}
                        disabled={loading}
                    >
                        <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
                        {loading ? "Memperbarui..." : "Update Produk"}
                    </button>
                    <NavLink to="/brands" className="btn btn-secondary">Kembali ke Brand</NavLink>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Produk</th>
                            <th>Operator</th>
                            <th>Harga Resell</th>
                            <th>Harga Asli</th>
                            <th>Stok</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-400">Belum ada produk</td>
                            </tr>
                        ) : (
                            products.map((product, idx) => (
                                <tr key={product.id}>
                                    <td>{idx + 1}</td>
                                    <td>{product.product_name}</td>
                                    <td>{brand?.operator}</td>
                                    <td>{product.resell_price ? <span>Rp {(product.resell_price).toLocaleString('id')}</span> : "Belum Diatur"}</td>
                                    <td>{product.price ?  <span>Rp {(product.price).toLocaleString('id')}</span> : "Tidak Diatur"}</td>
                                    <td>{product.unlimited_stock ? <Infinity /> : product.stock}</td>
                                    <td>
                                        <button onClick={() => handleHapus(product.id)} className="btn btn-error btn-xs mr-2">Hapus</button>
                                        <NavLink to={`/product/edit/${product.id}`} className="btn btn-xs btn-outline mr-2">Edit</NavLink>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}