import type { PaymentType } from "../../../types/paymentType";

type props = {
    payment: PaymentType;
}

export const DisplayPaymentDetail = ({payment}: props) => {
    return <>
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
                src={payment.image}
                alt={payment.name}
                className="w-24 h-24 object-contain rounded border border-primary shadow-primary-content shadow p-2"
            />
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary">{payment.name}</h2>
                <p className="text-sm text-gray-400 mt-1">{payment.type.replace("_", " ")}</p>
                <div className="mt-2">
                    <span className={`badge ${payment.active ? "badge-success" : "badge-error"} badge-outline`}>
                        {payment.active ? "Aktif" : "Tidak Aktif"}
                    </span>
                </div>
            </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-gray-400 mb-1">Channel Code</p>
                <p>{payment.channel_code || "-"}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400 mb-1">Dibuat pada</p>
                <p>{new Date(payment.created_at).toLocaleString("id-ID")}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400 mb-1">Terakhir diperbarui</p>
                <p>{new Date(payment.updated_at).toLocaleString("id-ID")}</p>
            </div>
            {payment.description && (
                <div className="mt-6">
                    <p className="text-sm text-gray-400 mb-1">Deskripsi</p>
                    <p className="text-base">{payment.description}</p>
                </div>
            )}
        </div>
    </>
}