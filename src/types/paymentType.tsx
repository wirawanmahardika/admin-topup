import type { paymentFeeType } from "./paymentFeeType";

export const paymentTypes = ["bank_transfer", "cstore", "qris", "echannel", "ewallet", "cardless_credit"];

export type PaymentType = {
    id: string;
    type: string;
    channel_code?: string;
    name: string;
    active: boolean;
    image: string;
    description?: string;
    payment_fees?: paymentFeeType[]
    created_at: string;
    updated_at: string;
};

export type paymentReducerActionType = {
    type: "get-all" | "delete",
    payload: PaymentType[] | string
}

export const paymentDefault: PaymentType = {
    id: "",
    type: "",
    channel_code: "",
    name: "",
    active: false,
    image: "",
    description: "",
    created_at: "",
    updated_at: "",
    payment_fees: [
        {
            id: "",
            id_payment_type: "",
            amount: 0,
            is_percentage: false,
            created_at: "",
            updated_at: ""
        }
    ]
};
