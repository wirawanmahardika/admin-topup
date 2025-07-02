export type sumarryDashboardType = {
    total_product: number;
    total_transaction: number;
    total_brand: number;
    total_profit: number;
}

export type transactionPermonthType = {
    bulan: number,
    jumlah_transaksi: number,
}

export type transactionPergameType = {
    game: string,
    total: number,
}