import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ModalConfirmation from "../../components/Modal";
import { PaymentsTableDisplay } from "../../components/payment/Info/PaymentTableDisplay";
import { usePaymentInfo } from "../../hooks/payment/Info/usePaymentInfo";

export default function PaymentInfo() {
    const { payments, id, setId, handleHapusPayment } = usePaymentInfo()

    return (
        <div className="bg-base-100 rounded-lg shadow p-6 mx-auto w-full">
            <ToastContainer />
            <ModalConfirmation id="delete-payment" message="Yakin ingin menghapus payment?" clickAction={() => handleHapusPayment(id)} />
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-6">Daftar Metode Pembayaran</h2>
                <NavLink to={"/payment/tambah"} className="btn btn-primary">Tambah Payment</NavLink>
            </div>
            <PaymentsTableDisplay setId={setId} payments={payments} />
        </div>
    )
}