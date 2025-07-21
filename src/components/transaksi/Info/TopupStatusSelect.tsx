import type { transactionType } from "../../../types/transactionType";

interface TopupStatusDisplayProps {
    value: transactionType["topup_status"];
}

export const TopupStatusSelect = ({ value }: TopupStatusDisplayProps) => {
    const getClassName = () => {
        switch (value) {
            case "Sukses": return "badge badge-success";
            case "Pending": return "badge badge-warning";
            case "Gagal": return "badge badge-error";
            default: return "badge";
        }
    };

    return (
        <span className={getClassName()}>
            {value}
        </span>
    );
};
