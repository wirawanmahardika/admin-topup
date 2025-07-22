type props = {
    search: string;
    resellPrice: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setResellPrice: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterProductDetail = ({ search, resellPrice, setSearch, setStatus, setResellPrice }: props) => {
    return <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
            type="text"
            className="input input-bordered"
            placeholder="Cari nama produk..."
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
        <select
            className="select select-bordered"
            value={status}
            onChange={e => setStatus(e.target.value)}
        >
            <option value="">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
        </select>
        <select
            className="select select-bordered"
            value={resellPrice}
            onChange={e => setResellPrice(e.target.value)}
        >
            <option value="">Semua Harga Resell</option>
            <option value="notnull">Ada Harga Resell</option>
            <option value="null">Tanpa Harga Resell</option>
        </select>
    </div>
}