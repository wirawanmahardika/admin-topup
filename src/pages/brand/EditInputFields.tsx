import { ToastContainer } from "react-toastify";
import { useEditInputFields } from "../../hooks/brand/EditInputFields/useEditInputFields";

export default function EditInputFieldBrand() {
    const { inputField, inputFields, handleRemoveInputField, handleUpdateEditInputFields, handleInputFieldChange, handleAddInputField, } = useEditInputFields()
    
    return <div className="bg-base-100 rounded-lg shadow p-6 w-full lg:w-2/3 ">
        <ToastContainer />
        <div className="flex flex-col gap-y-4 ">
            <h3 className="text-xl font-semibold">Input Field (Custom)</h3>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    name="input_key"
                    className="input input-bordered lg:w-1/2 w-full"
                    placeholder="Input Key"
                    value={inputField.input_key}
                    onChange={handleInputFieldChange}
                />
                <input
                    type="text"
                    name="label"
                    className="input input-bordered lg:w-1/2 w-full"
                    placeholder="Label"
                    value={inputField.label}
                    onChange={handleInputFieldChange}
                />
                <input
                    type="text"
                    name="placeholder"
                    className="input input-bordered lg:w-1/2 w-full"
                    placeholder="Placeholder"
                    value={inputField.placeholder}
                    onChange={handleInputFieldChange}
                />
                <button
                    type="button"
                    className="btn btn-success lg:w-1/2 w-full"
                    onClick={handleAddInputField}
                >
                    Simpan Input Field
                </button>
            </div>
            {inputFields.length > 0 && (
                <div className="mt-2">
                    <div className="font-semibold mb-2">Daftar Input Field:</div>
                    <ul className="list-disc pl-4 ">
                        {inputFields.map((field, idx) => (
                            <li key={idx} className="flex items-center gap-2 mt-3">
                                <span>
                                    <b>{field.label}</b> ({field.input_key}) - Placeholder: <i>{field.placeholder}</i> - Order: {field.order_index}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-xs btn-error"
                                    onClick={() => handleRemoveInputField(idx)}
                                >
                                    Hapus
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex gap-2">
                <button
                    type="button"
                    className="btn btn-accent"
                    onClick={handleUpdateEditInputFields}
                >
                    Edit
                </button>
            </div>
        </div>
    </div>
}