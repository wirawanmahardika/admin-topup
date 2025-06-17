import { useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const dummySales = [
    { month: "Jan", total: 120 },
    { month: "Feb", total: 98 },
    { month: "Mar", total: 150 },
    { month: "Apr", total: 170 },
    { month: "Mei", total: 140 },
    { month: "Jun", total: 180 },
    { month: "Jul", total: 160 },
    { month: "Agu", total: 200 },
    { month: "Sep", total: 175 },
    { month: "Okt", total: 190 },
    { month: "Nov", total: 210 },
    { month: "Des", total: 220 },
];

const dummyGameSales = [
    { game: "Mobile Legends", total: 520 },
    { game: "Free Fire", total: 410 },
    { game: "PUBG Mobile", total: 320 },
    { game: "Genshin Impact", total: 210 },
    { game: "Valorant", total: 180 },
];

const dummySummary = {
    totalTransaksi: 2450,
    totalUser: 1200,
    totalProduk: 35,
    totalPendapatan: 125_000_000,
};

const dummyRecent = [
    { user: "Budi", product: "86 Diamonds", game: "Mobile Legends", price: 20000, status: "success" },
    { user: "Siti", product: "70 Diamonds", game: "Free Fire", price: 15000, status: "pending" },
    { user: "Andi", product: "60 UC", game: "PUBG Mobile", price: 17000, status: "failed" },
];

export default function Dashboard() {
    const [sales] = useState(dummySales);
    const [gameSales] = useState(dummyGameSales);
    const [summary] = useState(dummySummary);
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

    // DaisyUI theme switcher
    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
        document.documentElement.setAttribute("data-theme", e.target.value);
        localStorage.setItem("theme", e.target.value);
    };

    const barData = {
        labels: sales.map(s => s.month),
        datasets: [
            {
                label: "Penjualan/Bulan",
                data: sales.map(s => s.total),
                backgroundColor: [
                    "rgba(59,130,246,0.7)",   // biru (Jan)
                    "rgba(34,197,94,0.7)",    // hijau (Feb)
                    "rgba(251,191,36,0.7)",   // kuning (Mar)
                    "rgba(239,68,68,0.7)",    // merah (Apr)
                    "rgba(168,85,247,0.7)",   // ungu (Mei)
                    "rgba(16,185,129,0.7)",   // teal (Jun)
                    "rgba(244,63,94,0.7)",    // pink (Jul)
                    "rgba(251,146,60,0.7)",   // orange (Agu)
                    "rgba(59,130,246,0.7)",   // biru (Sep)
                    "rgba(34,197,94,0.7)",    // hijau (Okt)
                    "rgba(251,191,36,0.7)",   // kuning (Nov)
                    "rgba(239,68,68,0.7)",    // merah (Des)
                ],
                borderRadius: 6,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Grafik Penjualan Per Bulan" },
        },
        scales: {
            y: { beginAtZero: true, ticks: { stepSize: 20 } },
        },
    };

    const doughnutData = {
        labels: gameSales.map(g => g.game),
        datasets: [
            {
                label: "Penjualan per Game",
                data: gameSales.map(g => g.total),
                backgroundColor: [
                    "#2563eb", // Mobile Legends
                    "#f59e42", // Free Fire
                    "#10b981", // PUBG Mobile
                    "#f43f5e", // Genshin Impact
                    "#a21caf", // Valorant
                ],
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
                <div className="flex items-center gap-2">
                    <span className="text-sm">Tema:</span>
                    <select
                        className="select select-bordered select-sm"
                        value={theme}
                        onChange={handleThemeChange}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="cupcake">Cupcake</option>
                        <option value="bumblebee">Bumblebee</option>
                        <option value="emerald">Emerald</option>
                        <option value="corporate">Corporate</option>
                        <option value="synthwave">Synthwave</option>
                        <option value="retro">Retro</option>
                        <option value="cyberpunk">Cyberpunk</option>
                        <option value="valentine">Valentine</option>
                        <option value="halloween">Halloween</option>
                        <option value="garden">Garden</option>
                        <option value="forest">Forest</option>
                        <option value="aqua">Aqua</option>
                        <option value="lofi">Lofi</option>
                        <option value="pastel">Pastel</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="wireframe">Wireframe</option>
                        <option value="black">Black</option>
                        <option value="luxury">Luxury</option>
                        <option value="dracula">Dracula</option>
                        <option value="cmyk">CMYK</option>
                        <option value="autumn">Autumn</option>
                        <option value="business">Business</option>
                        <option value="acid">Acid</option>
                        <option value="lemonade">Lemonade</option>
                        <option value="night">Night</option>
                        <option value="coffee">Coffee</option>
                        <option value="winter">Winter</option>
                    </select>
                </div>
            </div>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="stats shadow bg-primary text-primary-content">
                    <div className="stat">
                        <div className="stat-title">Total Transaksi</div>
                        <div className="stat-value">{summary.totalTransaksi.toLocaleString()}</div>
                    </div>
                </div>
                <div className="stats shadow bg-success text-success-content">
                    <div className="stat">
                        <div className="stat-title">Total User</div>
                        <div className="stat-value">{summary.totalUser.toLocaleString()}</div>
                    </div>
                </div>
                <div className="stats shadow bg-secondary text-secondary-content">
                    <div className="stat">
                        <div className="stat-title">Total Produk</div>
                        <div className="stat-value">{summary.totalProduk}</div>
                    </div>
                </div>
                <div className="stats shadow bg-warning text-warning-content">
                    <div className="stat">
                        <div className="stat-title">Total Pendapatan</div>
                        <div className="stat-value">Rp {summary.totalPendapatan.toLocaleString()}</div>
                    </div>
                </div>
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
            {/* Recent Transactions Table (dummy) */}
            <div className="mt-10">
                <h3 className="font-bold mb-3">Transaksi Terbaru</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Produk</th>
                                <th>Game</th>
                                <th>Harga</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyRecent.map((trx, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{trx.user}</td>
                                    <td>{trx.product}</td>
                                    <td>{trx.game}</td>
                                    <td>Rp {trx.price.toLocaleString()}</td>
                                    <td>
                                        {trx.status === "success" && <span className="badge badge-success">Berhasil</span>}
                                        {trx.status === "pending" && <span className="badge badge-warning">Pending</span>}
                                        {trx.status === "failed" && <span className="badge badge-error">Gagal</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}