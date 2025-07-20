type ManualProduct = {
    id: string;
    id_brand: string;
    brand: string;
    buyer_sku_code: string;
    category: string;
    product_name: string;
    desc: string;
    type: string;

    price: number;
    resell_price: number | null;
    stock: number;

    multi: boolean;
    unlimited_stock: boolean;
    buyer_product_status: boolean;
    seller_product_status: boolean;

    seller_name: string;

    start_cut_off: string; // format "HH:mm"
    end_cut_off: string;   // format "HH:mm"

    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
};

export function ManualProductList({
    products,
    onRemove,
}: {
    products: ManualProduct[];
    onRemove: (idx: number) => void;
}) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-xs w-full">
                <thead>
                    <tr>
                        <th>Nama Produk</th>
                        <th>Resell Price</th>
                        <th>Unlimited</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, idx) => (
                        <tr key={idx}>
                            <td>{p.product_name}</td>
                            <td>Rp {p.resell_price?.toLocaleString() ?? 0}</td>
                            <td>{p.unlimited_stock ? "Ya" : "Tidak"}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-xs btn-error"
                                    onClick={() => onRemove(idx)}
                                >Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}