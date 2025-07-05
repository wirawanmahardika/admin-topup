import type { transactionType } from "../../../types/transactionType";

interface TopupStatusSelectProps {
    value: transactionType["topup_status"];
    onChange: (val: transactionType["topup_status"]) => void;
    disabled?: boolean;
}

export const TopupStatusSelect = ({ value, onChange, disabled }: TopupStatusSelectProps) => {
    const getSelectClass = () => {
        switch (value) {
            case "sukses": return "select select-xs select-success";
            case "pending": return "select select-xs select-warning";
            case "gagal": return "select select-xs select-error";
            default: return "select select-xs";
        }
    };

    return (
        <select
            className={getSelectClass()}
            value={value}
            onChange={e => onChange(e.target.value as transactionType["topup_status"])}
            disabled={disabled}
        >
            <option value="sukses">Sukses</option>
            <option value="pending">Pending</option>
            <option value="gagal">Gagal</option>
        </select>
    );
};