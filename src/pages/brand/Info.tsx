import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useBrands } from "../../hooks/brand/Info/useBrands";
import { useBrandFilters } from "../../hooks/brand/Info/useBrandFilters";
import { BrandFilters } from "../../components/brand/info/BrandFilters";
import { BrandTable } from "../../components/brand/info/BrandTable";
import { ConfirmModal } from "../../components/brand/info/ConfirmModal";
import { Pagination } from "../../components/Pagination";
import { useEffect, useState } from "react";

export default function BrandInfo() {
    const {
        brands,
        isLoading,
        modalOpen,
        selectedBrand,
        openModal,
        closeModal,
        confirmDelete
    } = useBrands();

    const {
        filters,
        filteredBrands,
        updateFilter
    } = useBrandFilters(brands);

    // === Pagination logic ===
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
    const paginatedBrands = filteredBrands.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <ToastContainer />

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Daftar Brand Game</h2>
                <NavLink to="/brand/tambah" className="btn btn-primary">
                    Tambah Brand
                </NavLink>
            </div>

            {/* Filter UI */}
            <BrandFilters
                search={filters.search}
                operator={filters.operator}
                sort={filters.sort}
                onSearchChange={(val) => updateFilter("search", val)}
                onOperatorChange={(val) => updateFilter("operator", val)}
                onSortChange={(val) => updateFilter("sort", val as any)}
            />

            {/* Table UI */}
            <BrandTable
                brands={paginatedBrands}
                isLoading={isLoading}
                onDeleteBrand={openModal}
            />

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Modal Konfirmasi */}
            <ConfirmModal
                open={modalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                brandName={selectedBrand?.name ?? ""}
            />
        </div>
    );
}
