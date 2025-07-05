import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useBrands } from "../../hooks/brand/Info/useBrands";
import { useBrandFilters } from "../../hooks/brand/Info/useBrandFilters";
import { BrandFilters } from "../../components/brand/info/BrandFilters";
import { BrandTable } from "../../components/brand/info/BrandTable";
import { ConfirmModal } from "../../components/brand/info/ConfirmModal";


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
                onSortChange={(val) => updateFilter("sort", val as "created_desc" | "created_asc" | "popularity_desc" | "popularity_asc" | "name_asc" | "name_desc")}
            />

            {/* Table UI */}
            <BrandTable
                brands={filteredBrands}
                isLoading={isLoading}
                onDeleteBrand={openModal}
            />

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
