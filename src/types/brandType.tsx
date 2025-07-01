import type { productType } from "./productType";

export type brandType = {
    id: string;
    name: string;
    image: string;
    operator: string;
    popularity: number;
    created_at: string;
    updated_at: string;
    products?: productType 
}

export type brandReducerActionType = {
    type: "get-all" | "delete",
    payload: brandType[] | number
}