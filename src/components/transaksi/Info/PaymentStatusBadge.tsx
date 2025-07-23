import type { transactionType } from "../../../types/transactionType";

interface PaymentStatusBadgeProps {
    status: transactionType["payment_status"];
}

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
    const getBadgeConfig = () => {
        switch (status) {
            case "settlement":
            case "capture":
                return { className: "badge badge-success", text: "Berhasil" };
            case "pending":
                return { className: "badge badge-warning", text: "Pending" };
            case "deny":
            case "cancel":
            case "expire":
            case "failure":
                return { className: "badge badge-error capitalize", text: status };
            case "refund":
            case "partial_refund":
                return { className: "badge badge-primary capitalize", text: status.replace("_", " ") };
            default:
                return { className: "badge badge-ghost", text: status };
        }
    };

    const { className, text } = getBadgeConfig();
    return <span className={className}>{text}</span>;
};