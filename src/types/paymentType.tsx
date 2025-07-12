export type PaymentType = {
    id: string;
    type: string;
    channel_code?: string;
    name: string;
    active: boolean;
    image: string;
    description?: string;
    created_at: string;
    updated_at: string;
};