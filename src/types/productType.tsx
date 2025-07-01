import type { brandType } from "./brandType";

export type productType = {
    id: string;
    id_brand: string;
    digiflazz_product: boolean,
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