export type productType = {
    id: number;
    id_category: number;
    nama: string;
    harga: number;
    ilustrasi: string;
    digiflazz_code: string;
    deskripsi: string;
    status: true,
    created_at: string;
    updated_at: string;
    category: {
        id: number;
        nama: string;
        created_at: string;
        updated_at: string;
    }
}

export type productReducerActionType = {
    type: "get-all" | "delete",
    payload: productType[] | number
}