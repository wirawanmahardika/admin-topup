import { useState } from "react";

const games = [
    "Mobile Legends",
    "Free Fire",
    "PUBG Mobile",
    "Genshin Impact",
    "Valorant",
    "Call of Duty Mobile",
];

export default function TambahProduct() {
    const [name, setName] = useState("");
    const [game, setGame] = useState(games[0]);
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState<"active" | "inactive">("active");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simpan data product di sini
        alert(`Produk "${name}" untuk game "${game}" berhasil ditambahkan!`);
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Tambah Produk Topup Game</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nama Produk</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Contoh: 86 Diamonds"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Game</label>
                    <select
                        className="select select-bordered w-full"
                        value={game}
                        onChange={e => setGame(e.target.value)}
                        required
                    >
                        {games.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Harga</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Contoh: 20000"
                        min={0}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        className="select select-bordered w-full"
                        value={status}
                        onChange={e => setStatus(e.target.value as "active" | "inactive")}
                    >
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}