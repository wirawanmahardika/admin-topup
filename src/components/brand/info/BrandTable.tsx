import { NavLink } from "react-router-dom";
import type { brandType } from "../../../types/brandType";
import TruncateText from "../../TruncateText";

interface BrandTableProps {
    brands: brandType[];
    isLoading: boolean;
    onDeleteBrand: (brand: brandType) => void;
}

export const BrandTable = ({ brands, isLoading, onDeleteBrand }: BrandTableProps) => {
    if (isLoading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className="w-full">
            {/* Tabel desktop */}
            <div className="overflow-x-auto hidden md:block">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Brand</th>
                            <th>Logo</th>
                            <th>Popularitas</th>
                            <th>Operator</th>
                            <th>Dibuat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center text-gray-400">Belum ada brand</td>
                            </tr>
                        ) : (
                            brands.map((brand) => (
                                <tr key={brand.id}>
                                    <td><TruncateText text={brand.id} maxLength={20} /></td>
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
                                    <td className="space-x-1">
                                        <NavLink to={`/brand/edit/${brand.id}`} className="btn btn-xs btn-outline">Edit</NavLink>
                                        <NavLink to={`/brand/detail/${brand.id}`} className="btn btn-xs btn-accent">Detail</NavLink>
                                        <NavLink to={`/brand/${brand.id}/products`} className="btn btn-xs btn-info">Lihat Produk</NavLink>
                                        <button className="btn btn-xs btn-error" onClick={() => onDeleteBrand(brand)}>Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card mobile */}
            <div className="block md:hidden space-y-4">
                {brands.length === 0 ? (
                    <p className="text-center text-gray-400">Belum ada brand</p>
                ) : (
                    brands.map((brand) => (
                        <div key={brand.id} className="card bg-base-100 shadow border p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-bold text-base">{brand.name}</h2>
                                <span className={`badge ${brand.operator === "sistem" ? "badge-info" : "badge-secondary"}`}>
                                    {brand.operator === "sistem" ? "Sistem" : "Manual"}
                                </span>
                            </div>
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="w-full object-contain rounded mx-auto mb-2"
                            />
                            <p><span className="font-semibold">ID:</span> <TruncateText text={brand.id} maxLength={20} /></p>
                            <p><span className="font-semibold">Popularitas:</span> {brand.popularity}</p>
                            <p><span className="font-semibold">Dibuat:</span> {new Date(brand.created_at).toLocaleString()}</p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <NavLink to={`/brand/edit/${brand.id}`} className="btn btn-sm btn-outline flex-1">
                                    Edit
                                </NavLink>
                                <NavLink to={`/brand/detail/${brand.id}`} className="btn btn-sm btn-accent flex-1">
                                    Detail
                                </NavLink>
                                <NavLink to={`/brand/${brand.id}/products`} className="btn btn-sm btn-info flex-1">
                                    Produk
                                </NavLink>
                                <button
                                    className="btn btn-sm btn-error flex-1"
                                    onClick={() => onDeleteBrand(brand)}
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
