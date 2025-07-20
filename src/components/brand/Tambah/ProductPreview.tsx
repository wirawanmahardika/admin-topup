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

type ThirdPartyProduct = {
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