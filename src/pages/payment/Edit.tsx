import { useState } from "react";
import { useParams } from "react-router-dom";

// Dummy data, ganti dengan fetch data asli jika sudah ada backend
const dummyPayment = {
    type: "Bank Transfer",
    channel: "BCA",
    name: "BCA Virtual Account",
    active: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/BCA_logo.png",
    description: "Transfer melalui Virtual Account BCA",
};

const paymentTypes = ["QRIS", "Bank Transfer", "OTC"];
const channelOptions: Record<string, string[]> = {
    QRIS: ["QRIS"],
    "Bank Transfer": ["BCA", "BNI", "BRI", "MANDIRI"],
    OTC: ["ALFAMART", "INDOMARET"],
};

export default function EditPayment() {
    const { id } = useParams();
    const [type, setType] = useState(dummyPayment.type);
    const [channel, setChannel] = useState(dummyPayment.channel);
    const [name, setName] = useState(dummyPayment.name);
    const [active, setActive] = useState(dummyPayment.active);
    const [image, setImage] = useState(dummyPayment.image);
    const [description, setDescription] = useState(dummyPayment.description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Update data payment di sini
        alert("Payment berhasil diupdate!");
    };

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Metode Pembayaran</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Tipe</label>
                    <select
                        className="select select-bordered w-full"
                        value={type}
                        onChange={e => {
                            setType(e.target.value);
                            setChannel(channelOptions[e.target.value][0]);
                        }}
                    >
                        {paymentTypes.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Channel</label>
                    <select
                        className="select select-bordered w-full"
                        value={channel}
                        onChange={e => setChannel(e.target.value)}
                    >
                        {channelOptions[type].map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Nama</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Logo (URL)</label>
                    <input
                        type="url"
                        className="input input-bordered w-full"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={2}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={active}
                        onChange={e => setActive(e.target.checked)}
                        id="active"
                    />
                    <label htmlFor="active" className="cursor-pointer">Aktif</label>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
}