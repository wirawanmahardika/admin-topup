import { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import type { brandType } from "../../types/brandType";
import TruncateText from "../../components/TruncateText";
import { AxiosAuth } from "../../utils/axios";
import { loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

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

    // Filter states
    const [search, setSearch] = useState("");
    const [operator, setOperator] = useState(""); // "", "sistem", "manual"
    const [sort, setSort] = useState("created_desc"); // created_desc, created_asc, popularity_desc, popularity_asc, name_asc, name_desc

    useEffect(() => {
        AxiosAuth.get("/brands").then(res => {
            dispatch({ type: "get-all", payload: res.data.data });
        });
    }, []);

    const handleDelete = (brand: brandType) => {
        setSelectedBrand(brand);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedBrand) {
            const idToast = loadingToast()
            try {
                const res= await AxiosAuth.delete("/brand/"+selectedBrand.id)
                loadingSuccessToast(idToast, res.data.message)
                dispatch({ type: "delete", payload: selectedBrand.id });
            } catch (error: any) {
                loadingSuccessToast(idToast, error.response?.data?.message ?? "Terjadi kesalahan saat menghapus brand")
            }
            setModalOpen(false);
            setSelectedBrand(null);
        }
    };

    // Filter & sort logic
    const filteredBrands = brands
        .filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
        .filter(b => !operator || b.operator === operator)
        .sort((a, b) => {
            switch (sort) {
                case "created_asc": return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case "created_desc": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case "popularity_asc": return a.popularity - b.popularity;
                case "popularity_desc": return b.popularity - a.popularity;
                case "name_asc": return a.name.localeCompare(b.name);
                case "name_desc": return b.name.localeCompare(a.name);
                default: return 0;
            }
        });

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Daftar Brand Game</h2>
                <NavLink to={"/brand/tambah"} className="btn btn-primary">Tambah Brand</NavLink>
            </div>
            {/* Filter & Search */}
            <div className="flex flex-col md:flex-row gap-2 mb-4">
                <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Cari nama brand..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered"
                    value={operator}
                    onChange={e => setOperator(e.target.value)}
                >
                    <option value="">Semua Operator</option>
                    <option value="sistem">Sistem</option>
                    <option value="manual">Manual</option>
                </select>
                <select
                    className="select select-bordered"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    <option value="created_desc">Terbaru</option>
                    <option value="created_asc">Terlama</option>
                    <option value="popularity_desc">Popularitas Tertinggi</option>
                    <option value="popularity_asc">Popularitas Terendah</option>
                    <option value="name_asc">Nama A-Z</option>
                    <option value="name_desc">Nama Z-A</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Brand</th>
                            <th>Logo</th>
                            <th>Popularitas</th>
                            <th>Operator</th>
                            <th>Dibuat</th>
                            <th>Diupdate</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBrands.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center text-gray-400">Belum ada brand</td>
                            </tr>
                        ) : (
                            filteredBrands.map((brand) => (
                                <tr key={brand.id}>
                                    <td><TruncateText text={brand.id} maxLength={20} /> </td>
                                    <td>{brand.name}</td>
                                    <td>
                                        <img src={brand.image} alt={brand.name} className="w-12 h-12 object-contain rounded" />
                                    </td>
                                    <td>{brand.popularity}</td>
                                    <td>
                                        <span className={`badge ${brand.operator === "sistem" ? "badge-info" : "badge-secondary"}`}>
                                            {brand.operator === "sistem" ? "Sistem" : "Manual"}
                                        </span>
                                    </td>
                                    <td>{new Date(brand.created_at).toLocaleString()}</td>
                                    <td>{new Date(brand.updated_at).toLocaleString()}</td>
                                    <td>
                                        <NavLink to={"/brand/edit/" + brand.id} className="btn btn-xs btn-outline mr-2">Edit</NavLink>
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