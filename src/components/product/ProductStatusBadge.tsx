// components/ProductStatusBadge.tsx
interface ProductStatusBadgeProps {
    product: {
        unlimited_stock: boolean;
        stock: number;
    };
}

export const ProductStatusBadge = ({ product }: ProductStatusBadgeProps) => {
    const isActive = product.unlimited_stock || product.stock > 0;
    
    return (
        <span className={`badge ${isActive ? "badge-success" : "badge-error"}`}>
            {isActive ? "Aktif" : "Nonaktif"}
        </span>
    );
};