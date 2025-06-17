import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const games = [
    "Mobile Legends",
    "Free Fire",
    "PUBG Mobile",
    "Genshin Impact",
    "Valorant",
    "Call of Duty Mobile",
];

// Dummy data, ganti dengan fetch data asli sesuai id jika sudah ada backend
const dummyProduct = {
    id: 1,
    name: "86 Diamonds",
    game: "Mobile Legends",
    price: 20000,
    status: "active" as "active" | "inactive",
};

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    console.log(id);
    // Inisialisasi state dengan data produk yang akan diedit
    const [name, setName] = useState(dummyProduct.name);
    const [game, setGame] = useState(dummyProduct.game);
    const [price, setPrice] = useState(dummyProduct.price.toString());
    const [status, setStatus] = useState<"active" | "inactive">(dummyProduct.status);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Update data produk di sini
        alert(`Produk "${name}" berhasil diupdate!`);
        navigate("/product");
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Produk Topup Game</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nama Produk</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={e => setName(e.target.value)}
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
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    )
}