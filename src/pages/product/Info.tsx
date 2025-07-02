import { useEffect, useReducer, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { productReducer } from "../../hooks/reducer/product";
import type { productType } from "../../types/productType";
import { AxiosAuth } from "../../utils/axios";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import TruncateText from "../../components/TruncateText";


type ConfirmModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName: string;
};

function ConfirmModal({ open, onClose, onConfirm, productName }: ConfirmModalProps) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-opacity-40">
            <div className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-xs">
                <h3 className="font-bold text-lg mb-2">Konfirmasi Hapus</h3>
                <p className="mb-4">
                    Apakah Anda yakin ingin menghapus produk <span className="font-semibold">{productName}</span>?
                </p>
                <div className="flex justify-end gap-2">
                    <button className="btn btn-sm btn-ghost" onClick={onClose}>
                        Batal
                    </button>
                    <button className="btn btn-sm btn-error" onClick={onConfirm}>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductInfo() {
    const [products, dispatch] = useReducer(productReducer, []);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<productType | null>(null);

    // Filter states
    const [search, setSearch] = useState("");
    const [game, setGame] = useState("");
    const [status, setStatus] = useState(""); // "aktif", "nonaktif", ""
    const [resellPrice, setResellPrice] = useState(""); // "null", "notnull", ""

    // Get unique game list for filter
    const gameList = useMemo(() => {
        const setGames = new Set<string>();
        products.forEach((p: productType) => {
            if (p.brand_info?.name) setGames.add(p.brand_info.name);
        });
        return Array.from(setGames);
    }, [products]);

    useEffect(() => {
        AxiosAuth.get("/products").then(res => {
            dispatch({ type: "get-all", payload: res.data.data });
        })
    }, [])

    const handleDelete = (product: productType) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedProduct) {
            const idToast = loadingToast()
            try {
                const res = await AxiosAuth.delete("/product/" + selectedProduct.id)
                dispatch({ type: "delete", payload: selectedProduct.id });
                loadingSuccessToast(idToast, res.data.message)
                setModalOpen(false);
                setSelectedProduct(null);
            } catch (error: any) {
                loadingErrorToast(idToast, error.response?.data?.message ?? "Terjadi kesalahan ketika menghapus product")
            }
        }
    };

    // Filter logic
    const filteredProducts = useMemo(() => {
        return products.filter((product: productType) => {
            // Filter nama produk
            const matchName = product.product_name.toLowerCase().includes(search.toLowerCase());
            // Filter game
            const matchGame = !game || product.brand_info?.name === game;
            // Filter status
            const isAktif = product.unlimited_stock || product.stock > 0;
            const matchStatus = !status ||
                (status === "aktif" && isAktif) ||
                (status === "nonaktif" && !isAktif);
            // Filter harga resell
            const matchResell =
                !resellPrice ||
                (resellPrice === "null" && (product.resell_price === null || product.resell_price === undefined)) ||
                (resellPrice === "notnull" && product.resell_price !== null && product.resell_price !== undefined);

            return matchName && matchGame && matchStatus && matchResell;
        });
    }, [products, search, game, status, resellPrice]);

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <ToastContainer />
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
                <h2 className="text-xl font-bold">Daftar Produk Topup Game</h2>
                <NavLink to={"/product/tambah"} className="btn btn-primary">Tambah Produk</NavLink>
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
                    value={game}
                    onChange={e => setGame(e.target.value)}
                >
                    <option value="">Semua Game</option>
                    {gameList.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
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
                            <th>Game</th>
                            <th>Harga Resell</th>
                            <th>Harga Asli</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-400">Belum ada produk</td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td><TruncateText maxLength={20} text={product.id}/></td>
                                    <td>{product.product_name}</td>
                                    <td>{product.brand_info?.name}</td>
                                    <td>
                                        {product.resell_price !== null && product.resell_price !== undefined
                                            ? <span>Rp {(product.resell_price).toLocaleString('id')}</span>
                                            : <span className="text-gray-400">Belum Diatur</span>
                                        }
                                    </td>
                                    <td>Rp {product.price.toLocaleString()}</td>
                                    <td>
                                        <span className={`badge ${product.unlimited_stock || product.stock > 0 ? "badge-success" : "badge-error"}`}>
                                            {product.unlimited_stock || product.stock > 0 ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </td>
                                    <td>
                                        <NavLink to={"/product/edit/" + product.id} className="btn btn-xs btn-outline mr-2">Edit</NavLink>
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => handleDelete(product)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <ConfirmModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
                productName={selectedProduct?.product_name || ""}
            />
        </div>
    )
}