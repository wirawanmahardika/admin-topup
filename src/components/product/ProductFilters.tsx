// components/ProductFilters.tsx
interface ProductFiltersProps {
    search: string;
    game: string;
    status: "" | "aktif" | "nonaktif";
    resellPrice: "" | "null" | "notnull";
    gameList: string[];
    onSearchChange: (value: string) => void;
    onGameChange: (value: string) => void;
    onStatusChange: (value: "" | "aktif" | "nonaktif") => void;
    onResellPriceChange: (value: "" | "null" | "notnull") => void;
}

export const ProductFilters = ({
    search,
    game,
    status,
    resellPrice,
    gameList,
    onSearchChange,
    onGameChange,
    onStatusChange,
    onResellPriceChange
}: ProductFiltersProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
                type="text"
                className="input input-bordered"
                placeholder="Cari nama produk..."
                value={search}
                onChange={e => onSearchChange(e.target.value)}
            />
            
            <select
                className="select select-bordered"
                value={game}
                onChange={e => onGameChange(e.target.value)}
            >
                <option value="">Semua Game</option>
                {gameList.map(g => (
                    <option key={g} value={g}>{g}</option>
                ))}
            </select>
            
            <select
                className="select select-bordered"
                value={status}
                onChange={e => onStatusChange(e.target.value as "" | "aktif" | "nonaktif")}
            >
                <option value="">Semua Status</option>
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
            </select>
            
            <select
                className="select select-bordered"
                value={resellPrice}
                onChange={e => onResellPriceChange(e.target.value as "" | "null" | "notnull")}
            >
                <option value="">Semua Harga Resell</option>
                <option value="notnull">Ada Harga Resell</option>
                <option value="null">Tanpa Harga Resell</option>
            </select>
        </div>
    );
};