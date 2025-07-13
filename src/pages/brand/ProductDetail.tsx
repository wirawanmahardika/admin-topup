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

    // Filter states
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(""); // "aktif", "nonaktif", ""
    const [resellPrice, setResellPrice] = useState(""); // "null", "notnull", ""

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
            setProducts((v) => v.filter(value => value.id !== id))
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Gagal menghapus product")
        }
    }

    // Filter logic
    const filteredProducts = products.filter((product) => {
        // Filter nama produk
        const matchName = product.product_name.toLowerCase().includes(search.toLowerCase());
        // Filter status aktif/nonaktif
        const isAktif = product.unlimited_stock || product.stock > 0;
        const matchStatus = !status ||
            (status === "aktif" && isAktif) ||
            (status === "nonaktif" && !isAktif);
        // Filter harga resell
        const matchResell =
            !resellPrice ||
            (resellPrice === "null" && (product.resell_price === null || product.resell_price === undefined)) ||
            (resellPrice === "notnull" && product.resell_price !== null && product.resell_price !== undefined);

        return matchName && matchStatus && matchResell;
    });

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Produk dari Brand: {brand?.name}</h2>
                <div className="flex gap-2">
                    {brand?.operator === "manual" ?
                        <NavLink to={`/brand/${id}/product/tambah`} className="btn btn-primary flex items-center gap-2" >
                            Tambah Produk
                        </NavLink>
                        :
                        <button
                            className="btn btn-accent flex items-center gap-2"
                            onClick={handleSync}
                            disabled={loading}
                        >
                            <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
                            {loading ? "Memperbarui..." : "Update Produk"}
                        </button>
                    }
                    <NavLink to="/brands" className="btn btn-secondary">Kembali ke Brand</NavLink>
                </div>
            </div>
            {/* Filter */}
            <div className="flex flex-col md:flex-row gap-2 mb-4">
                <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Cari nama produk..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    <option value="">Semua Status</option>
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                </select>
                <select
                    className="select select-bordered"
                    value={resellPrice}
                    onChange={e => setResellPrice(e.target.value)}
                >
                    <option value="">Semua Harga Resell</option>
                    <option value="notnull">Ada Harga Resell</option>
                    <option value="null">Tanpa Harga Resell</option>
                </select>
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
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center text-gray-400">Belum ada produk</td>
                            </tr>
                        ) : (
                            filteredProducts.map((product, idx) => (
                                <tr key={product.id}>
                                    <td>{idx + 1}</td>
                                    <td>{product.product_name}</td>
                                    <td>{brand?.operator}</td>
                                    <td>{product.resell_price ? <span>Rp {(product.resell_price).toLocaleString('id')}</span> : "Belum Diatur"}</td>
                                    <td>{product.price ? <span>Rp {(product.price).toLocaleString('id')}</span> : "Tidak Diatur"}</td>
                                    <td>{product.unlimited_stock ? <Infinity /> : product.stock}</td>
                                    <td>
                                        <span className={`badge ${product.unlimited_stock || product.stock > 0 ? "badge-success" : "badge-error"}`}>
                                            {product.unlimited_stock || product.stock > 0 ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </td>
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