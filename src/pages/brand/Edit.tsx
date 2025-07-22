import { useBrandEdit } from "../../hooks/brand/Edit/useBrandEdit";

export default function EditBrand() {
    const { handleSubmit, name, popularity, setPopularity, setImage, loading, navigate } = useBrandEdit()

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Brand</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold">Nama Brand</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        readOnly
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
                <div>
                    <label className="block mb-1 font-semibold">Logo Brand (opsional)</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                        onChange={e => setImage(e.target.files?.[0] || null)}
                    />
                </div>
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
                        disabled={loading}
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}