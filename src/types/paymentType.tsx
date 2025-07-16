import type { paymentFeeType } from "./paymentFeeType";

export type PaymentType = {
    id: string;
    type: string;
    channel_code?: string;
    name: string;
    active: boolean;
    image: string;
    midtrans_price: number;
    description?: string;
    payment_fees?: paymentFeeType[]
    created_at: string;
    updated_at: string;
};

export type paymentReducerActionType = {
    type: "get-all" | "delete",
    payload: PaymentType[] | string
}