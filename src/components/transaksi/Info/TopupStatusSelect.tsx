import type { transactionType } from "../../../types/transactionType";

interface TopupStatusSelectProps {
    value: transactionType["topup_status"];
    onChange: (val: transactionType["topup_status"]) => void;
    disabled?: boolean;
}

export const TopupStatusSelect = ({ value, onChange, disabled }: TopupStatusSelectProps) => {
    console.log(value);
    
    const getSelectClass = () => {
        console.log(value);
        
        switch (value) {
            case "Sukses": return "select select-xs select-success";
            case "Pending": return "select select-xs select-warning";
            case "Gagal": return "select select-xs select-error";
            default: return "select select-xs";
        }
    };

    return (
        <select
            className={getSelectClass()}
            value={value}
            onChange={e => {
                onChange(e.target.value as transactionType["topup_status"])}}
            disabled={disabled}
        >
            <option value="Sukses">Sukses</option>
            <option value="Pending">Pending</option>
            <option value="Gagal">Gagal</option>
        </select>
    );
};