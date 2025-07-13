import type { productType } from "./productType";

export type brandType = {
    id: string;
    name: string;
    image: string;
    operator: string;
    popularity: number;
    created_at: string;
    updated_at: string;
    products?: productType[]
    input_fields: {
        id: string;
        id_brand: string;
        input_key: string;
        label: string;
        placeholder: string;
        order_index: number;

        created_at: string;
        updated_at: string;
    }[]
}

export type brandReducerActionType = {
    type: "get-all" | "delete",
    payload: brandType[] | number
}