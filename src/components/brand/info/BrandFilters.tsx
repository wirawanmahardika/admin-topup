
// components/BrandFilters.tsx
interface BrandFiltersProps {
    search: string;
    operator: "" | "sistem" | "manual";
    sort: string;
    onSearchChange: (val: string) => void;
    onOperatorChange: (val: "" | "sistem" | "manual") => void;
    onSortChange: (val: string) => void;
}

export const BrandFilters = ({
    search,
    operator,
    sort,
    onSearchChange,
    onOperatorChange,
    onSortChange
}: BrandFiltersProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
                type="text"
                className="input input-bordered"
                placeholder="Cari nama brand..."
                value={search}
                onChange={e => onSearchChange(e.target.value)}
            />
            <select
                className="select select-bordered"
                value={operator}
                onChange={e => onOperatorChange(e.target.value as any)}
            >
                <option value="">Semua Operator</option>
                <option value="sistem">Sistem</option>
                <option value="manual">Manual</option>
            </select>
            <select
                className="select select-bordered"
                value={sort}
                onChange={e => onSortChange(e.target.value)}
            >
                <option value="created_desc">Terbaru</option>
                <option value="created_asc">Terlama</option>
                <option value="popularity_desc">Popularitas Tertinggi</option>
                <option value="popularity_asc">Popularitas Terendah</option>
                <option value="name_asc">Nama A-Z</option>
                <option value="name_desc">Nama Z-A</option>
            </select>
        </div>
    );
};
