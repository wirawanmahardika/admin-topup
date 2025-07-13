import { useNavigate } from "react-router-dom";
import { loadingErrorToast, loadingToast } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { AxiosAuth } from "../../utils/axios";
import { ManualProductList } from "../../components/brand/Tambah/ManualProductList";
import { ProductPreview } from "../../components/brand/Tambah/ProductPreview";
import { ThirdPartyProductList } from "../../components/brand/Tambah/ThidPartyProductList";
import { useBrandForm } from "../../hooks/brand/Tambah/useBrandForm";

/// Komponen Utama
export default function TambahBrand() {
    const navigate = useNavigate();
    const {
        name,
        setName,
        image,
        setImage,
        popularity,
        setPopularity,
        tab,
        setTab,
        products,
        manualProducts,
        manualInput,
        loading,
        setLoading,
        loadingProducts,
        handleLoadProducts,
        handleResellPriceChange,
        handleRemoveThirdPartyProduct,
        handleManualInputChange,
        handleAddManualProduct,
        handleRemoveManualProduct,
    } = useBrandForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("image", image);
        formData.append("popularity", popularity.toString());
        formData.append("operator", tab === "thirdparty" ? "sistem" : "manual");
        if (tab === "thirdparty") {
            formData.append("products", JSON.stringify(products));
        } else {
            const readyManual = manualProducts.map((p) => ({
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
            await AxiosAuth.post("/brand", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/brands");
        } catch (err: any) {
            loadingErrorToast(idToast, err.response?.data?.message ?? "Gagal menambah brand!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="bg-base-100 rounded-lg shadow p-6 max-w-lg w-full fixed bottom-0 right-0 md:static md:rounded-lg md:shadow md:max-w-lg z-50"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
            <ToastContainer />
            <h2 className="text-xl font-bold mb-4">Tambah Brand Baru</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold">Nama Brand</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Logo Brand</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
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
                        onChange={(e) => setPopularity(Number(e.target.value))}
                    />
                </div>
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
                        <label
                            htmlFor="tab-thirdparty"
                            className={`tab ${tab === "thirdparty" ? "tab-active" : ""}`}
                        >
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
                    {tab === "thirdparty" && (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={() => handleLoadProducts(name)}
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
                <ProductPreview tab={tab} thirdPartyProducts={products} manualProducts={manualProducts} />
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