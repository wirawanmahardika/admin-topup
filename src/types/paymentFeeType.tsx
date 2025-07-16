import type { PaymentType } from "./paymentType";

export type paymentFeeType = {
    id: string;
    id_payment_type: string;
    amount: number;
    is_percentage: boolean;
    created_at: string;
    updated_at: string;
    payment_type?: PaymentType;
}