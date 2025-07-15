// components/ProductTable.tsx
import { NavLink } from "react-router-dom";
import type { productType } from "../../../types/productType";
import TruncateText from "../../TruncateText";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { ProductResellPrice } from "./ProductResellPrice";

interface ProductTableProps {
    products: productType[];
    isLoading: boolean;
    onDeleteProduct: (product: productType) => void;
}

export const ProductTable = ({ products, isLoading, onDeleteProduct }: ProductTableProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
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
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center text-gray-400">
                                Belum ada produk
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <TruncateText maxLength={20} text={product.id} />
                                </td>
                                <td>{product.product_name}</td>
                                <td>{product.brand_info?.name || "-"}</td>
                                <td>
                                    <ProductResellPrice resellPrice={product.resell_price} />
                                </td>
                                <td>{product.price ? `Rp ${product.price.toLocaleString()}` : "Tidak Diatur"}</td>
                                <td>
                                    <ProductStatusBadge product={product} />
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <NavLink
                                            to={`/product/edit/${product.id}`}
                                            className="btn btn-xs btn-outline"
                                        >
                                            Edit
                                        </NavLink>
                                        <button className="btn btn-xs btn-info" disabled={product.brand_info?.operator === "manual"}>
                                            <NavLink
                                                to={`/product/${product.id}/detail`}
                                            >
                                                Detail
                                            </NavLink>
                                        </button>
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => onDeleteProduct(product)}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};