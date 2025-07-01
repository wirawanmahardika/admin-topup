import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { AxiosAuth } from "../../utils/axios";

// Untuk produk manual
type ManualProduct = {
    product_name: string;
    resell_price: number;
    price: number; // Untuk manual, bisa diisi 0 atau sama dengan resell_price jika ingin
    unlimited_stock: boolean;
    digiflazz_product: boolean; // selalu false untuk manual
};

// Untuk produk third party
type ThirdPartyProduct = {
    product_name: string;
    resell_price: number;
    price: number; // harga asli dari third party
    unlimited_stock: boolean;
    digiflazz_product: boolean; // selalu true untuk third party
};

function ThirdPartyProductList({
    products,
    onResellPriceChange,
    onRemove,
}: {
    products: ThirdPartyProduct[];
    onResellPriceChange: (idx: number, value: number) => void;
    onRemove: (idx: number) => void;
}) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-xs w-full">
                <thead>
                    <tr>
                        <th>Nama Produk</th>
                        <th>Harga (Price)</th>
                        <th>Resell Price</th>
                        <th>Unlimited</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, idx) => (
                        <tr key={idx}>
                            <td>{p.product_name}</td>
                            <td>Rp {p.price?.toLocaleString?.() ?? "-"}</td>
                            <td>
                                <input
                                    type="number"
                                    className="input input-xs input-bordered w-24"
                                    value={p.resell_price}
                                    min={0}
                                    onChange={e => onResellPriceChange(idx, Number(e.target.value))}
                                />
                            </td>
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

function ManualProductList({
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

function ProductPreview({
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

export default function TambahBrand() {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [popularity, setPopularity] = useState(0);

    // Tab state
    const [tab, setTab] = useState<"thirdparty" | "manual">("thirdparty");

    // Third party
    const [products, setProducts] = useState<ThirdPartyProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    // Manual
    const [manualProducts, setManualProducts] = useState<ManualProduct[]>([]);
    const [manualInput, setManualInput] = useState<ManualProduct>({
        product_name: "",
        resell_price: 0,
        price: 0,
        unlimited_stock: true,
        digiflazz_product: false,
    });

    const navigate = useNavigate();

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("image", image);
        formData.append("popularity", popularity.toString());
        if (tab === "thirdparty") {
            // Kirim semua field third party + resell_price yang sudah diedit admin
            formData.append("products", JSON.stringify(products));
        } else {
            // Manual: hanya field yang diperlukan
            const readyManual = manualProducts.map(p => ({
                product_name: p.product_name,
                resell_price: p.resell_price,
                price: 0,
                unlimited_stock: true,
                digiflazz_product: false,
            }));
            formData.append("products", JSON.stringify(readyManual));
        }

        const idToast = loadingToast();
        try {
            formData.forEach((v, k) => { console.log(v, k) })

            await AxiosAuth.post("/brand", formData, { headers: { "Content-Type": "multipart/form-data" } });
            navigate("/brands");
        } catch (err: any) {
            loadingErrorToast(idToast, err.response?.data?.message ?? "Gagal menambah brand!");
        }
        setLoading(false);
    };

    // Load dari third party
    const handleLoadProducts = async () => {
        setLoadingProducts(true);
        const idToast = loadingToast("sedang mengambil data product dengan brand " + name);
        try {
            const res = await AxiosAuth.get("/products/digiflazz", { params: { brand: name } });
            // Map ke ThirdPartyProduct dan tambahkan resell_price default 0
            const arr = (res.data.data as any[]).map((p: any) => ({
                ...p,
                product_name: p.product_name,
                resell_price: 0,
                price: p.price,
                unlimited_stock: p.unlimited_stock ?? true,
                digiflazz_product: true,
            }));
            setProducts(arr);
            loadingSuccessToast(idToast, res.data.message);
        } catch (error: any) {
            loadingErrorToast(idToast, error.response?.data?.message ?? "Gagal memuat produk dari third party!");
        }
        setLoadingProducts(false);
    };

    // Third party resell price handler
    const handleResellPriceChange = (idx: number, value: number) => {
        setProducts(prev =>
            prev.map((p, i) => (i === idx ? { ...p, resell_price: value } : p))
        );
    };

    const handleRemoveThirdPartyProduct = (idx: number) => {
        setProducts(prev => prev.filter((_, i) => i !== idx));
    };

    // Manual product handlers
    const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setManualInput(prev => ({
            ...prev,
            [name]: name === "resell_price" || name === "price" ? Number(value) : value,
        }));
    };

    const handleAddManualProduct = () => {
        if (!manualInput.product_name || manualInput.resell_price <= 0) return;
        setManualProducts(prev => [...prev, { ...manualInput }]);
        setManualInput({
            product_name: "",
            resell_price: 0,
            price: 0,
            unlimited_stock: true,
            digiflazz_product: false,
        });
    };

    const handleRemoveManualProduct = (idx: number) => {
        setManualProducts(prev => prev.filter((_, i) => i !== idx));
    };

    // Responsive: panel kanan bawah
    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg w-full fixed bottom-0 right-0 md:static md:rounded-lg md:shadow md:max-w-lg z-50"
            style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <ToastContainer />
            <h2 className="text-xl font-bold mb-4">Tambah Brand Baru</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold">Nama Brand</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Logo Brand</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                        onChange={e => setImage(e.target.files?.[0] || null)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Popularitas</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        value={popularity}
                        min={0}
                        onChange={e => setPopularity(Number(e.target.value))}
                    />
                </div>
                {/* Tabs-box with radio inputs */}
                <div>
                    <div className="tabs tabs-boxed mb-2 flex">
                        <input
                            type="radio"
                            id="tab-thirdparty"
                            name="tab"
                            className="tab"
                            checked={tab === "thirdparty"}
                            onChange={() => setTab("thirdparty")}
                        />
                        <label htmlFor="tab-thirdparty" className={`tab ${tab === "thirdparty" ? "tab-active" : ""}`}>
                            Produk dari Third Party
                        </label>
                        <input
                            type="radio"
                            id="tab-manual"
                            name="tab"
                            className="tab"
                            checked={tab === "manual"}
                            onChange={() => setTab("manual")}
                        />
                        <label htmlFor="tab-manual" className={`tab ${tab === "manual" ? "tab-active" : ""}`}>
                            Produk Manual
                        </label>
                    </div>
                    {/* Third Party Tab */}
                    {tab === "thirdparty" && (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={handleLoadProducts}
                                    disabled={loadingProducts || !name}
                                >
                                    {loadingProducts ? "Memuat..." : "Load Product dari Third Party"}
                                </button>
                                {products.length > 0 && (
                                    <span className="text-success text-xs">Produk siap dikirim</span>
                                )}
                            </div>
                            {products.length > 0 && (
                                <ThirdPartyProductList
                                    products={products}
                                    onResellPriceChange={handleResellPriceChange}
                                    onRemove={handleRemoveThirdPartyProduct}
                                />
                            )}
                        </div>
                    )}
                    {/* Manual Tab */}
                    {tab === "manual" && (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    name="product_name"
                                    className="input input-bordered w-full"
                                    placeholder="Nama Produk"
                                    value={manualInput.product_name}
                                    onChange={handleManualInputChange}
                                />
                                <input
                                    type="number"
                                    name="resell_price"
                                    className="input input-bordered w-32"
                                    placeholder="Resell Price"
                                    value={manualInput.resell_price}
                                    min={0}
                                    onChange={handleManualInputChange}
                                />
                                {/* Hidden input */}
                                <input type="hidden" name="unlimited_stock" value="true" />
                                <input type="hidden" name="digiflazz_product" value="false" />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleAddManualProduct}
                                >
                                    Tambah
                                </button>
                            </div>
                            {manualProducts.length > 0 && (
                                <ManualProductList
                                    products={manualProducts}
                                    onRemove={handleRemoveManualProduct}
                                />
                            )}
                        </div>
                    )}
                </div>
                {/* Preview semua produk */}
                <ProductPreview
                    tab={tab}
                    thirdPartyProducts={products}
                    manualProducts={manualProducts}
                />
                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/brands")}
                        disabled={loading}
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || (tab === "thirdparty" ? products.length === 0 : manualProducts.length === 0)}
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}