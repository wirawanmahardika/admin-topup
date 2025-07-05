// components/BrandTable.tsx
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
                                <td>{new Date(brand.updated_at).toLocaleString()}</td>
                                <td>
                                    <NavLink to={`/brand/edit/${brand.id}`} className="btn btn-xs btn-outline mr-2">Edit</NavLink>
                                    <NavLink to={`/brand/${brand.id}/products`} className="btn btn-xs btn-info mr-2">Lihat Produk</NavLink>
                                    <button className="btn btn-xs btn-error" onClick={() => onDeleteBrand(brand)}>Hapus</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};