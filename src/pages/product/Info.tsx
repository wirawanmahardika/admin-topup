import { useState } from "react";
import { NavLink } from "react-router-dom";

// Modal sederhana
function ConfirmModal({
    open,
    onClose,
    onConfirm,
    productName,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName: string;
}) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-base-100 rounded-lg shadow p-6 w-full max-w-sm">
                <h3 className="font-bold text-lg mb-2">Konfirmasi Hapus</h3>
                <p className="mb-4">Yakin ingin menghapus produk <span className="font-semibold">{productName}</span>?</p>
                <div className="flex justify-end gap-2">
                    <button className="btn btn-ghost" onClick={onClose}>Batal</button>
                    <button className="btn btn-error" onClick={onConfirm}>Hapus</button>
                </div>
            </div>
        </div>
    );
}

type Product = {
    id: number;
    name: string;
    game: string;
    price: number;
    status: "active" | "inactive";
};

const dummyProducts: Product[] = [
    { id: 1, name: "86 Diamonds", game: "Mobile Legends", price: 20000, status: "active" },
    { id: 2, name: "70 Diamonds", game: "Free Fire", price: 15000, status: "active" },
    { id: 3, name: "60 UC", game: "PUBG Mobile", price: 17000, status: "inactive" },
    { id: 4, name: "Genesis Crystal 300", game: "Genshin Impact", price: 75000, status: "active" },
];

export default function ProductInfo() {
    const [products, setProducts] = useState<Product[]>(dummyProducts);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedProduct) {
            setProducts(products.filter(p => p.id !== selectedProduct.id));
            setModalOpen(false);
            setSelectedProduct(null);
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Daftar Produk Topup Game</h2>
                <NavLink to={"/product/tambah"} className="btn btn-primary">Tambah Produk</NavLink>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Produk</th>
                            <th>Game</th>
                            <th>Harga</th>
                            <th>Status</th>
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
                                    <td>{product.name}</td>
                                    <td>{product.game}</td>
                                    <td>Rp {product.price.toLocaleString()}</td>
                                    <td>
                                        <span className={`badge ${product.status === "active" ? "badge-success" : "badge-error"}`}>
                                            {product.status === "active" ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </td>
                                    <td>
                                        <NavLink to={"edit/" + product.id} className="btn btn-xs btn-outline mr-2">Edit</NavLink>
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
                productName={selectedProduct?.name || ""}
            />
        </div>
    )
}