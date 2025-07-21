import type { brandType } from "./brandType"
import type { productType } from "./productType"

export type transactionType = {
    id: string,
    id_product: string,
    id_brand: string,
    customer_number: string,
    buyer_sku_code: string,
    profit: number,
    payment_status: string,
    topup_status: "Sukses" | "Gagal" | "Pending",
    created_at: string,
    updated_at: string,
    brand?: brandType,
    product?:productType
}

export const transactionDataDefault: transactionType = {
    id: "",
    id_product: "",
    id_brand: "",
    customer_number: "",
    buyer_sku_code: "",
    profit: 0,
    payment_status: "",
    topup_status: "Pending",
    created_at: "",
    updated_at: "",
    brand: undefined,
    product: {
        id: "",
        id_brand: "",
        product_name: "",
        category: "",
        type: "",
        seller_name: "",
        price: 0,
        resell_price: 0,
        buyer_sku_code: "",
        buyer_product_status: false,
        seller_product_status: false,
        unlimited_stock: false,
        stock: 0,
        multi: false,
        start_cut_off: "",
        end_cut_off: "",
        desc: "",
        created_at: "",
        updated_at: ""
    }
};
