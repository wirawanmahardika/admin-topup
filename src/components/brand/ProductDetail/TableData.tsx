import { Infinity } from "lucide-react"
import type { brandType } from "../../../types/brandType"
import type { productType } from "../../../types/productType"
import { NavLink } from "react-router-dom"
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast"
import { AxiosAuth } from "../../../utils/axios"

type props = {
    brand: brandType | null
    filteredProducts: productType[]
    setProducts: React.Dispatch<React.SetStateAction<productType[]>>
}

export const TableDataProductDetail = ({ brand, filteredProducts, setProducts }: props) => {
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

    return <div className="overflow-x-auto">
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
}