import { useEffect, useState } from "react";
import { errorToast } from "../../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import type { brandType } from "../../../types/brandType";
import { AxiosAuth } from "../../../utils/axios";

export const useBrandDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [brand, setBrand] = useState<brandType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      errorToast("ID brand tidak valid");
      navigate("/brands");
      return;
    }

    const fetchBrand = async () => {
      setLoading(true);
      try {
        const res = await AxiosAuth.get(`/brand/${id}`);
        const brandData: brandType = res.data.data;
        console.log(brandData);

        setBrand(brandData);
      } catch (error: any) {
        errorToast(error.response?.data?.message ?? "Gagal memuat detail brand");
        navigate("/brands");
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id, navigate]);

  return { brand, loading };
};