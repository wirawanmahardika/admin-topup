export type brandType = {
    id: string;
    name: string;
    image: string;
    popularity: number;
    created_at: string;
    updated_at: string;
}

export type brandReducerActionType = {
    type: "get-all" | "delete",
    payload: brandType[] | number
}