import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosAuth } from "../../../utils/axios";
import { errorToast } from "../../../utils/toast";

export const useBrandEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [popularity, setPopularity] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        AxiosAuth.get(`/brand/${id}`)
            .then(res => {
                setName(res.data.data.name);
                setPopularity(res.data.data.popularity);
            });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name); // tetap masuk body request
        formData.append("popularity", popularity.toString());
        if (image) formData.append("image", image);

        try {
            await AxiosAuth.put(`/brand/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            navigate("/brands");
        } catch (error: any) {
            errorToast(error.response?.data?.message ?? "Gagal update brand " + name)
        }
        setLoading(false);
    };

    return { name, setName, popularity, setPopularity, image, setImage, loading, navigate, handleSubmit }
}