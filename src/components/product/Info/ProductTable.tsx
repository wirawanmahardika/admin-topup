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
        <div className="w-full">
            {/* Table untuk desktop */}
            <div className="overflow-x-auto hidden md:block">
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
                                                <NavLink to={`/product/${product.id}/detail`}>
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

            {/* Card untuk mobile */}
            <div className="block md:hidden space-y-4">
                {products.length === 0 ? (
                    <p className="text-center text-gray-400">Belum ada produk</p>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="card bg-base-100 shadow p-4 border">
                            <h2 className="font-bold mb-1 text-sm">{product.product_name}</h2>
                            <p className="text-xs text-gray-500 mb-2"><TruncateText maxLength={20} text={product.id} /></p>

                            <p><span className="font-semibold">Game:</span> {product.brand_info?.name || "-"}</p>
                            <p><span className="font-semibold">Harga Resell:</span> <ProductResellPrice resellPrice={product.resell_price} /></p>
                            <p><span className="font-semibold">Harga Asli:</span> {product.price ? `Rp ${product.price.toLocaleString()}` : "Tidak Diatur"}</p>
                            <p><span className="font-semibold">Status:</span> <ProductStatusBadge product={product} /></p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <NavLink
                                    to={`/product/edit/${product.id}`}
                                    className="btn btn-sm btn-outline flex-1"
                                >
                                    Edit
                                </NavLink>

                                <NavLink
                                    to={`/product/${product.id}/detail`}
                                    className="btn btn-sm btn-info flex-1"
                                >
                                    Detail
                                </NavLink>

                                <button
                                    onClick={() => onDeleteProduct(product)}
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
