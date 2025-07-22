import { Infinity } from "lucide-react";
import type { brandType } from "../../../types/brandType";
import type { productType } from "../../../types/productType";
import { NavLink } from "react-router-dom";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { AxiosAuth } from "../../../utils/axios";

type props = {
    brand: brandType | null;
    filteredProducts: productType[];
    setProducts: React.Dispatch<React.SetStateAction<productType[]>>;
};

export const TableDataProductDetail = ({ brand, filteredProducts, setProducts }: props) => {
    const handleHapus = async (id: string) => {
        const idToast = loadingToast();
        try {
            const res = await AxiosAuth.delete("/product/" + id);
            loadingSuccessToast(idToast, res.data.message);
            setProducts((v) => v.filter(value => value.id !== id));
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Gagal menghapus product");
        }
    };

    return (
        <div className="w-full">
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
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
                                    <td>{product.resell_price ? `Rp ${product.resell_price.toLocaleString('id')}` : "Belum Diatur"}</td>
                                    <td>{product.price ? `Rp ${product.price.toLocaleString('id')}` : "Tidak Diatur"}</td>
                                    <td>{product.unlimited_stock ? <Infinity /> : product.stock}</td>
                                    <td>
                                        <span className={`badge ${product.unlimited_stock || product.stock > 0 ? "badge-success" : "badge-error"}`}>
                                            {product.unlimited_stock || product.stock > 0 ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleHapus(product.id)} className="btn btn-error btn-xs mr-2">Hapus</button>
                                        <NavLink to={`/product/edit/${product.id}`} className="btn btn-xs btn-outline">Edit</NavLink>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
                {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-400">Belum ada produk</p>
                ) : (
                    filteredProducts.map((product, idx) => (
                        <div key={product.id} className="card bg-base-100 shadow p-4 border">
                            <div className="flex justify-between mb-2">
                                <h2 className="font-bold">{product.product_name}</h2>
                                <span className={`badge ${product.unlimited_stock || product.stock > 0 ? "badge-success" : "badge-error"}`}>
                                    {product.unlimited_stock || product.stock > 0 ? "Aktif" : "Nonaktif"}
                                </span>
                            </div>
                            <p><span className="font-semibold">#:</span> {idx + 1}</p>
                            <p><span className="font-semibold">Operator:</span> {brand?.operator}</p>
                            <p><span className="font-semibold">Harga Resell:</span> {product.resell_price ? `Rp ${product.resell_price.toLocaleString('id')}` : "Belum Diatur"}</p>
                            <p><span className="font-semibold">Harga Asli:</span> {product.price ? `Rp ${product.price.toLocaleString('id')}` : "Tidak Diatur"}</p>
                            <p><span className="font-semibold">Stok:</span> {product.unlimited_stock ? <Infinity className="inline-block" /> : product.stock}</p>

                            <div className="mt-3 flex gap-2 flex-wrap">
                                <NavLink to={`/product/edit/${product.id}`} className="btn btn-sm btn-outline flex-1">
                                    Edit
                                </NavLink>
                                <button
                                    onClick={() => handleHapus(product.id)}
                                    className="btn btn-sm btn-error flex-1"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
