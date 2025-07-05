import { useMemo, useState } from "react";
import type { brandType } from "../../../types/brandType";

type SortOption = "created_desc" | "created_asc" | "popularity_desc" | "popularity_asc" | "name_asc" | "name_desc";

interface FilterState {
    search: string;
    operator: "" | "sistem" | "manual";
    sort: SortOption;
}

export const useBrandFilters = (brands: brandType[]) => {
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        operator: "",
        sort: "created_desc"
    });

    const filteredBrands = useMemo(() => {
        return brands
            .filter(b => b.name.toLowerCase().includes(filters.search.toLowerCase()))
            .filter(b => !filters.operator || b.operator === filters.operator)
            .sort((a, b) => {
                switch (filters.sort) {
                    case "created_asc": return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                    case "created_desc": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    case "popularity_asc": return a.popularity - b.popularity;
                    case "popularity_desc": return b.popularity - a.popularity;
                    case "name_asc": return a.name.localeCompare(b.name);
                    case "name_desc": return b.name.localeCompare(a.name);
                    default: return 0;
                }
            });
    }, [brands, filters]);

    const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        filters,
        filteredBrands,
        updateFilter
    };
};
