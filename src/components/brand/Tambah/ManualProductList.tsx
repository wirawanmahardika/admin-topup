type ManualProduct = {
    product_name: string;
    resell_price: number;
    price: number;
    unlimited_stock: boolean;
    digiflazz_product: boolean;
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
                            <td>Rp {p.resell_price.toLocaleString()}</td>
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