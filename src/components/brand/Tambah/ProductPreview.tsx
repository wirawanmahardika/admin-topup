type ManualProduct = {
    product_name: string;
    resell_price: number;
    price: number;
    unlimited_stock: boolean;
    digiflazz_product: boolean;
};

type ThirdPartyProduct = {
    product_name: string;
    resell_price: number;
    price: number;
    unlimited_stock: boolean;
    digiflazz_product: boolean;
};

export function ProductPreview({
    tab,
    thirdPartyProducts,
    manualProducts,
}: {
    tab: "thirdparty" | "manual";
    thirdPartyProducts: ThirdPartyProduct[];
    manualProducts: ManualProduct[];
}) {
    return (
        <div>
            <label className="block mb-1 font-semibold">Preview Produk yang Akan Dikirim</label>
            {tab === "thirdparty" && thirdPartyProducts.length === 0 && (
                <div className="text-gray-400 text-sm">Belum ada produk</div>
            )}
            {tab === "manual" && manualProducts.length === 0 && (
                <div className="text-gray-400 text-sm">Belum ada produk</div>
            )}
            {tab === "thirdparty" && thirdPartyProducts.length > 0 && (
                <ul className="list-decimal ml-5 text-sm">
                    {thirdPartyProducts.map((p, idx) => (
                        <li key={idx}>
                            {p.product_name} - Harga: Rp {p.price?.toLocaleString?.() ?? "-"} | Resell: Rp {p.resell_price?.toLocaleString?.() ?? "-"}
                        </li>
                    ))}
                </ul>
            )}
            {tab === "manual" && manualProducts.length > 0 && (
                <ul className="list-decimal ml-5 text-sm">
                    {manualProducts.map((p, idx) => (
                        <li key={idx}>
                            {p.product_name} - Resell: Rp {p.resell_price?.toLocaleString?.() ?? "-"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}