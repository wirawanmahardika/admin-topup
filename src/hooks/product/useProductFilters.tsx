// hooks/useProductFilters.ts
import { useMemo, useState } from "react";
import type { productType } from "../../types/productType";

interface ProductFilterState {
    search: string;
    game: string;
    status: "" | "aktif" | "nonaktif";
    resellPrice: "" | "null" | "notnull";
}

export const useProductFilters = (products: productType[]) => {
    const [filters, setFilters] = useState<ProductFilterState>({
        search: "",
        game: "",
        status: "",
        resellPrice: ""
    });

    // Get unique game list for filter
    const gameList = useMemo(() => {
        const setGames = new Set<string>();
        products.forEach((p: productType) => {
            if (p.brand_info?.name) setGames.add(p.brand_info.name);
        });
        return Array.from(setGames).sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product: productType) => {
            // Filter nama produk
            const matchName = product.product_name.toLowerCase().includes(filters.search.toLowerCase());
            
            // Filter game
            const matchGame = !filters.game || product.brand_info?.name === filters.game;
            
            // Filter status
            const isAktif = product.unlimited_stock || product.stock > 0;
            const matchStatus = !filters.status ||
                (filters.status === "aktif" && isAktif) ||
                (filters.status === "nonaktif" && !isAktif);
            
            // Filter harga resell
            const matchResell =
                !filters.resellPrice ||
                (filters.resellPrice === "null" && (product.resell_price === null || product.resell_price === undefined)) ||
                (filters.resellPrice === "notnull" && product.resell_price !== null && product.resell_price !== undefined);

            return matchName && matchGame && matchStatus && matchResell;
        });
    }, [products, filters]);

    const updateFilter = <K extends keyof ProductFilterState>(key: K, value: ProductFilterState[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        filters,
        filteredProducts,
        gameList,
        updateFilter
    };
};