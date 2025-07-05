import * as XLSX from "xlsx";
import type { transactionType } from "../../../types/transactionType";

export const exportTransactionsToXLSX = (transactions: transactionType[]) => {
    const data = transactions.map(trx => ({
        "ID": trx.id,
        "Nomor Customer": trx.customer_number,
        "Product": trx.product?.product_name || "-",
        "Brand": trx.brand?.name || "-",
        "Profit": trx.profit,
        "Operator": trx.brand?.operator ?? "-",
        "Payment Status": trx.payment_status,
        "Topup Status": trx.topup_status,
        "Tanggal Dibuat": trx.created_at,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transaksi");
    XLSX.writeFile(wb, "transaksi-topup.xlsx");
};