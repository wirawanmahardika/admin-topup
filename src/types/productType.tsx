import type { brandType } from "./brandType";

export type productType = {
    id: string;
    id_brand: string;
    product_name: string;
    category: string;
    type: string;
    seller_name: string;
    price: number,
    resell_price: number,
    buyer_sku_code: string;
    buyer_product_status: boolean,
    seller_product_status: boolean,
    unlimited_stock: boolean,
    stock: number,
    multi: boolean,
    start_cut_off: string;
    end_cut_off: string;
    desc: string;
    created_at: string;
    updated_at: string;
    brand_info?: brandType
}

export type productReducerActionType = {
    type: string;
    payload: productType[] | string
}

export const productDefault: productType = {
    id: "prod_001",
    id_brand: "brand_001",
    product_name: "Pulsa Telkomsel 50.000",
    category: "Pulsa",
    type: "Prepaid",
    seller_name: "Digital Store Indonesia",
    price: 49500,
    resell_price: 50000,
    buyer_sku_code: "TSEL50",
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: false,
    stock: 150,
    multi: true,
    start_cut_off: "06:00",
    end_cut_off: "23:00",
    desc: "Pulsa Telkomsel 50.000 dengan proses otomatis dan instan. Berlaku untuk semua nomor Telkomsel di seluruh Indonesia. Pulsa akan masuk dalam 1-5 menit setelah pembayaran berhasil.",
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-07-15T10:15:00Z",
    brand_info: {
        id: "",
        operator: "",
        popularity: 0,
        created_at: "",
        updated_at: "",
        name: "",
        image: "",
        input_fields: []
    }
};