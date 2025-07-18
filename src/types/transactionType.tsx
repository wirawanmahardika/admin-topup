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