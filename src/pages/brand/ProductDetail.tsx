import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import type { productType } from "../../types/productType";
import { Infinity, RefreshCw } from "lucide-react";

export default function BrandProductDetail() {
    const { id } = useParams();
    const [products, setProducts] = useState<productType[]>([]);
    const [brandName, setBrandName] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [id]);

    const fetchProducts = async () => {
        if (!id) return;
        try {
            const res = await axios.get(`http://localhost:3000/products/${id}`)
            setProducts(res.data.data.products || []);
            setBrandName(res.data.data.name || "");
        } catch (error) {
            alert('gagal fetch  produk')
        }
    };

    const handleSync = async () => {
        if (!id) return;
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/brand/${id}/products`);
            fetchProducts(); // refresh data setelah sync
            alert("Berhasil update product");
        } catch (err: any) {
            alert(err.response?.data?.message ?? "Gagal update data produk!");
        }
        setLoading(false);
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Produk dari Brand: {brandName}</h2>
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
                            <th>Kategori</th>
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
                                    <td>{product.category}</td>
                                    <td>{product.resell_price ? <span>Rp {(product.resell_price).toLocaleString('id')}</span> : "Belum Diatur"}</td>
                                    <td>Rp {(product.price).toLocaleString('id')}</td>
                                    <td>{product.unlimited_stock ? <Infinity /> : product.stock}</td>
                                    <td>
                                        <NavLink to={`/products/edit/${product.id}`} className="btn btn-xs btn-outline mr-2">Edit</NavLink>
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