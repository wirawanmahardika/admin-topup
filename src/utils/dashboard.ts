export const getFullMonthData = (data: { bulan: number, jumlah_transaksi: number }[] | null) => {
    const arr: { bulan: number, jumlah_transaksi: number }[] = [];
    for (let i = 1; i <= 12; i++) {
        const found = data?.find(d => d.bulan === i);
        arr.push({
            bulan: i,
            jumlah_transaksi: found ? found.jumlah_transaksi : 0,
        });
    }
    return arr;
};

export const doughnutColors = [
    "#2563eb", // Biru
    "#f59e42", // Oranye
    "#10b981", // Hijau
    "#f43f5e", // Merah
    "#a21caf", // Ungu
    "#fde047", // Kuning
    "#6366f1", // Indigo
    "#f472b6", // Pink
    "#0ea5e9", // Cyan
    "#facc15", // Gold
];