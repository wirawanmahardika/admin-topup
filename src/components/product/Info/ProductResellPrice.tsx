// components/ProductResellPrice.tsx
interface ProductResellPriceProps {
    resellPrice: number | null | undefined;
}

export const ProductResellPrice = ({ resellPrice }: ProductResellPriceProps) => {
    if (resellPrice !== null && resellPrice !== undefined) {
        return <span>Rp {resellPrice.toLocaleString('id')}</span>;
    }
    
    return <span className="text-gray-400">Belum Diatur</span>;
};
