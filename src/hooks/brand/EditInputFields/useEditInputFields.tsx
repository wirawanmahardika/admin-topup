import { useState } from "react";
import { useParams } from "react-router-dom";
import { loadingErrorToast, loadingSuccessToast, loadingToast } from "../../../utils/toast";
import { AxiosAuth } from "../../../utils/axios";

export const useEditInputFields = () => {
    const { id } = useParams()
    const [inputField, setInputField] = useState({
        input_key: "",
        label: "",
        placeholder: "",
    });
    const [inputFields, setInputFields] = useState<
        { input_key: string; label: string; placeholder: string; order_index: number }[]
    >([]);

    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value });
    };

    const handleAddInputField = () => {
        if (!inputField.input_key || !inputField.label) return;
        setInputFields([
            ...inputFields,
            {
                ...inputField,
                order_index: inputFields.length + 1,
            },
        ]);
        setInputField({ input_key: "", label: "", placeholder: "" });
    };

    const handleRemoveInputField = (idx: number) => {
        setInputFields(inputFields.filter((_, i) => i !== idx));
    };

    const handleUpdateEditInputFields = async () => {
        const idToast = loadingToast()
        try {
            console.log(inputFields);

            const res = await AxiosAuth.put("/brand-input-field/" + id, { input_fields: inputFields })
            loadingSuccessToast(idToast, res.data.message)
        } catch (error: any) {
            console.log(error);
            loadingErrorToast(idToast, error.response?.data.message ?? "Terjadi kesalahan")
        }
    }
    return { inputField, inputFields, handleInputFieldChange, handleAddInputField, handleRemoveInputField, handleUpdateEditInputFields }
}