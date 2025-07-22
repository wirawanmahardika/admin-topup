import { NavLink } from "react-router-dom"
import type { brandType } from "../../../types/brandType"

type props = {
    id?: string;
    brand: brandType
}

export function DataCustomer({ id, brand }: props) {
    return <div className="w-full">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Input Fields</h3>
            <NavLink to={`/brand/${id}/input-field/edit`} className="btn btn-primary btn-sm">Edit</NavLink>
        </div>

        <div className="overflow-x-auto mt-3">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th className="text-base-content">Input Key</th>
                        <th className="text-base-content">Label</th>
                        <th className="text-base-content">Placeholder</th>
                        <th className="text-base-content">Urutan Tampil</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        brand.input_fields?.map((i) => {
                            return <tr key={i.id}>
                                <td>{i.input_key}</td>
                                <td>{i.label}</td>
                                <td>{i.placeholder}</td>
                                <td>{i.order_index}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

    </div>
}