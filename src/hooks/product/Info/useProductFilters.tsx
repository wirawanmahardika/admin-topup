// hooks/useProductFilters.ts
import { useMemo, useState } from "react";
import type { productType } from "../../../types/productType";

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

    const gameList = useMemo(() => {
        const setGames = new Set<string>();
        products.forEach((p: productType) => {
            if (p.brand_info?.name) setGames.add(p.brand_info.name);
        });
        return Array.from(setGames).sort();
    }, [products]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredProducts = useMemo(() => {
        const result = products.filter((product: productType) => {
            const matchName = product.product_name.toLowerCase().includes(filters.search.toLowerCase());
            const matchGame = !filters.game || product.brand_info?.name === filters.game;
            const isAktif = product.unlimited_stock || product.stock > 0;
            const matchStatus = !filters.status ||
                (filters.status === "aktif" && isAktif) ||
                (filters.status === "nonaktif" && !isAktif);
            const matchResell =
                !filters.resellPrice ||
                (filters.resellPrice === "null" && (product.resell_price === null || product.resell_price === undefined)) ||
                (filters.resellPrice === "notnull" && product.resell_price !== null && product.resell_price !== undefined);

            return matchName && matchGame && matchStatus && matchResell;
        });

        return result;
    }, [products, filters]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    const updateFilter = <K extends keyof ProductFilterState>(key: K, value: ProductFilterState[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1); // reset ke halaman pertama saat filter berubah
    };

    return {
        filters,
        paginatedProducts, // hanya yang ditampilkan
        gameList,
        updateFilter,
        currentPage,
        setCurrentPage,
        totalPages: Math.ceil(filteredProducts.length / itemsPerPage)
    };
};
