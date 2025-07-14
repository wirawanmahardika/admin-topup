import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { AxiosAuth } from "../utils/axios";
import type { sumarryDashboardType, transactionPergameType, transactionPermonthType } from "../types/dashboardType";
import type { transactionType } from "../types/transactionType";
import { doughnutColors, getFullMonthData } from "../utils/dashboard";
import SummaryCard from "../components/dashboard/SummaryCard";
import ChartCard from "../components/dashboard/ChartCard";
import RecentTransactionTable from "../components/dashboard/RecentTransactionTable";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
export default function Dashboard() {
    const [recentTransactions, setRecentTransactions] = useState<transactionType[] | null>(null)
    const [transactionPermonth, setTransactionPermonth] = useState<transactionPermonthType[] | null>(null)
    const [transactionPergame, setTransactionPergame] = useState<transactionPergameType[] | null>(null)
    const [summary, setSummary] = useState<sumarryDashboardType | null>(null);

    useEffect(() => {
        Promise.all([
            AxiosAuth.get("/dashboard/summary"),
            AxiosAuth.get("http://localhost:3000/dashboard/recent-transaction"),
            AxiosAuth.get("http://localhost:3000/dashboard/transaction-permonth"),
            AxiosAuth.get("http://localhost:3000/dashboard/transaction-pergame"),
        ]).then(([summaryData, recentTransactionsData, transactionPermonthData, transactionPergameData]) => {
            setSummary(summaryData.data.data)
            setRecentTransactions(recentTransactionsData.data.data)
            setTransactionPermonth(transactionPermonthData.data.data)
            setTransactionPergame(transactionPergameData.data.data)
        })
    }, [])

    const fullMonthData = getFullMonthData(transactionPermonth);
    const barData = {
        labels: fullMonthData.map(s => ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][s.bulan - 1]),
        datasets: [
            {
                label: "Penjualan/Bulan",
                data: fullMonthData.map(s => s.jumlah_transaksi),
                backgroundColor: [
                    "rgba(59,130,246,0.7)",   // Jan
                    "rgba(34,197,94,0.7)",    // Feb
                    "rgba(251,191,36,0.7)",   // Mar
                    "rgba(239,68,68,0.7)",    // Apr
                    "rgba(168,85,247,0.7)",   // Mei
                    "rgba(16,185,129,0.7)",   // Jun
                    "rgba(244,63,94,0.7)",    // Jul
                    "rgba(251,146,60,0.7)",   // Agu
                    "rgba(59,130,246,0.7)",   // Sep
                    "rgba(34,197,94,0.7)",    // Okt
                    "rgba(251,191,36,0.7)",   // Nov
                    "rgba(239,68,68,0.7)",    // Des
                ],
                borderRadius: 6,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Grafik Penjualan Per Bulan Tahun " + dayjs().year() },
        },
        scales: {
            y: { beginAtZero: true, ticks: { stepSize: 20 } },
        },
    };

    const doughnutData = {
        labels: transactionPergame?.map(g => g.game),
        datasets: [
            {
                label: "Penjualan per Game (populer)",
                data: transactionPergame?.map(g => g.total),
                backgroundColor: transactionPergame
                    ? transactionPergame.map((_, idx) => doughnutColors[idx % doughnutColors.length])
                    : doughnutColors,
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            legend: { position: "bottom" as const },
            title: { display: true, text: "Distribusi Penjualan per Game" },
        },
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold">Dashboard Penjualan</h2>
            </div>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <SummaryCard type="Total Transaksi" colorClass="bg-primary text-primary-content" value={summary?.total_transaction.toString() ?? ""} />
                <SummaryCard type="Total Game" colorClass="bg-success text-success-content" value={summary?.total_brand.toString() ?? ""} />
                <SummaryCard type="Total Produk" colorClass="bg-secondary text-secondary-content" value={summary?.total_product.toString() ?? ""} />
                <SummaryCard type="Total Pendapatan" colorClass="bg-warning text-secondary-content" value={summary?.total_profit.toLocaleString("id") ?? ""} />
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ChartCard>
                    <Bar data={barData} options={barOptions} />
                </ChartCard>
                <ChartCard>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                </ChartCard>
            </div>
            {/* Recent Transactions Table (dummy) */}
            <RecentTransactionTable transactionData={recentTransactions ?? []} />
        </div>
    )
}