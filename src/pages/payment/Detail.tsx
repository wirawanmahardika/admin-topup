import { DisplayPaymentDetail } from "../../components/payment/Detail/DisplayPaymentDetail";
import { PaymentFees } from "../../components/payment/Detail/PaymentFees";
import { usePaymentDetail } from "../../hooks/payment/Detail/usePaymentDetail";

export default function PaymentDetail() {
    const { payment } = usePaymentDetail()

    return (
        <div className="min-h-screen bg-base-100 text-base-content p-6">
            <div className="mx-auto bg-base-200 p-6 rounded-xl shadow-lg border border-base-300">
                <DisplayPaymentDetail payment={payment} />
                {payment.payment_fees && payment.payment_fees?.length > 0 && <PaymentFees payment={payment} />}
            </div>
        </div>
    );
}
