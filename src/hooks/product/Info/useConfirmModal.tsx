// hooks/useConfirmModal.ts
import { useState } from "react";
import type { productType } from "../../../types/productType";

export const useConfirmModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<productType | null>(null);

    const openModal = (product: productType) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedProduct(null);
    };

    return {
        isOpen,
        selectedProduct,
        openModal,
        closeModal
    };
};

// components/ConfirmModal.tsx
interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName: string;
    isLoading?: boolean;
}

export const ConfirmModal = ({ open, onClose, onConfirm, productName, isLoading }: ConfirmModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40">
            <div className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
                <h3 className="font-bold text-lg mb-2">Konfirmasi Hapus</h3>
                <p className="mb-4">
                    Apakah Anda yakin ingin menghapus produk{" "}
                    <span className="font-semibold">{productName}</span>?
                </p>
                <div className="flex justify-end gap-2">
                    <button 
                        className="btn btn-sm btn-ghost" 
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Batal
                    </button>
                    <button 
                        className="btn btn-sm btn-error" 
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? <span className="loading loading-spinner loading-xs"></span> : "Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
};