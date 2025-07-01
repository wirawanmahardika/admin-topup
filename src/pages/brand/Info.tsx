import { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import type { brandType } from "../../types/brandType";
import TruncateText from "../../components/TruncateText";
import { AxiosAuth } from "../../utils/axios";

// Modal sederhana untuk konfirmasi hapus
function ConfirmModal({
    open,
    onClose,
    onConfirm,
    brandName,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    brandName: string;
}) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-base-100 rounded-lg shadow p-6 w-full max-w-sm">
                <h3 className="font-bold text-lg mb-2">Konfirmasi Hapus</h3>
                <p className="mb-4">Yakin ingin menghapus brand <span className="font-semibold">{brandName}</span>?</p>
                <div className="flex justify-end gap-2">
                    <button className="btn btn-ghost" onClick={onClose}>Batal</button>
                    <button className="btn btn-error" onClick={onConfirm}>Hapus</button>
                </div>
            </div>
        </div>
    );
}

// Reducer sederhana untuk brand
function brandReducer(state: brandType[], action: { type: "get-all" | "delete", payload: brandType[] | string }) {
    switch (action.type) {
        case "get-all":
            return action.payload as brandType[];
        case "delete":
            return state.filter(b => b.id !== action.payload);
        default:
            return state;
    }
}

export default function BrandInfo() {
    const [brands, dispatch] = useReducer(brandReducer, []);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<brandType | null>(null);

    useEffect(() => {
        AxiosAuth.get("/brands").then(res => {
            dispatch({ type: "get-all", payload: res.data.data });
        });
    }, []);

    const handleDelete = (brand: brandType) => {
        setSelectedBrand(brand);
        setModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedBrand) {
            // Panggil API hapus jika perlu
            dispatch({ type: "delete", payload: selectedBrand.id });
            setModalOpen(false);
            setSelectedBrand(null);
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Daftar Brand Game</h2>
                <NavLink to={"/brand/tambah"} className="btn btn-primary">Tambah Brand</NavLink>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Brand</th>
                            <th>Logo</th>
                            <th>Popularitas</th>
                            <th>Dibuat</th>
                            <th>Diupdate</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-400">Belum ada brand</td>
                            </tr>
                        ) : (
                            brands.map((brand) => (
                                <tr key={brand.id}>
                                    <td><TruncateText text={brand.id} maxLength={20} /> </td>
                                    <td>{brand.name}</td>
                                    <td>
                                        <img src={brand.image} alt={brand.name} className="w-12 h-12 object-contain rounded" />
                                    </td>
                                    <td>{brand.popularity}</td>
                                    <td>{new Date(brand.created_at).toLocaleString()}</td>
                                    <td>{new Date(brand.updated_at).toLocaleString()}</td>
                                    <td>
                                        <NavLink to={"edit/" + brand.id} className="btn btn-xs btn-outline mr-2">Edit</NavLink>
                                        <NavLink
                                            to={`/brand/${brand.id}/products`}
                                            className="btn btn-xs btn-info mr-2"
                                        >
                                            Lihat Produk
                                        </NavLink>
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => handleDelete(brand)}
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
                brandName={selectedBrand?.name || ""}
            />
        </div>
    )
}