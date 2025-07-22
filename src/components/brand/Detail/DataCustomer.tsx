import type { brandType } from "../../../types/brandType"

type props = {
    brand: brandType
}

export function DataCustomer({ brand }: props) {
    return <div className="grid justify-items-center grid-cols-2 gap-8">
        <div>
            <label className="block mb-1 font-semibold text-base-content">Logo Brand</label>
            <div className="w-32 h-32 rounded overflow-hidden">
                <img
                    src={brand.image || "https://via.placeholder.com/128"}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
        <div>
            <label className="block mb-1 font-semibold text-base-content">Nama Brand</label>
            <p className="text-lg font-medium text-gray-500">{brand.name}</p>
        </div>
        <div>
            <label className="block mb-1 font-semibold text-base-content">Popularitas</label>
            <p className="text-lg font-medium text-gray-500">{brand.popularity}</p>
        </div>
        <div>
            <label className="block mb-1 font-semibold text-base-content">Operator</label>
            <p className="text-lg font-medium text-gray-500 capitalize">{brand.operator || "Tidak diketahui"}</p>
        </div>
    </div>
}