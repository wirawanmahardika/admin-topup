// Main Component - ProductInfo.tsx
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import type { productType } from "../../types/productType";
import { useProducts } from "../../hooks/product/Info/useProducts";
import { ProductFilters } from "../../components/product/Info/ProductFilters";
import { ProductTable } from "../../components/product/Info/ProductTable";
import { useProductFilters } from "../../hooks/product/Info/useProductFilters";
import { ConfirmModal, useConfirmModal } from "../../hooks/product/Info/useConfirmModal";
import { Pagination } from "../../components/Pagination";

export default function ProductInfo() {
    const { products, isLoading, deleteProduct } = useProducts();
    // const { filters, filteredProducts, gameList, updateFilter } = useProductFilters(products);
    const { isOpen, selectedProduct, openModal, closeModal } = useConfirmModal();
        const { 
        filters, 
        paginatedProducts, 
        gameList, 
        updateFilter, 
        currentPage, 
        setCurrentPage, 
        totalPages 
    } = useProductFilters(products);

    const handleDeleteProduct = (product: productType) => {
        openModal(product);
    };

    const confirmDelete = async () => {
        if (selectedProduct) {
            const success = await deleteProduct(selectedProduct.id);
            if (success) {
                closeModal();
            }
        }
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <ToastContainer />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
                <h2 className="text-xl font-bold">Daftar Produk Topup Game</h2>
                <NavLink
                    to="/product/tambah"
                    className="btn btn-primary"
                >
                    Tambah Produk
                </NavLink>
            </div>

            {/* Filters */}
            <ProductFilters
                search={filters.search}
                game={filters.game}
                status={filters.status}
                resellPrice={filters.resellPrice}
                gameList={gameList}
                onSearchChange={value => updateFilter('search', value)}
                onGameChange={value => updateFilter('game', value)}
                onStatusChange={value => updateFilter('status', value)}
                onResellPriceChange={value => updateFilter('resellPrice', value)}
            />

            <ProductTable
                products={paginatedProducts}
                isLoading={isLoading}
                onDeleteProduct={handleDeleteProduct}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}

            {/* Confirm Modal */}
            <ConfirmModal
                open={isOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                productName={selectedProduct?.product_name || ""}
                isLoading={isLoading}
            />
        </div>
    );
}