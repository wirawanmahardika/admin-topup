export default function ModalConfirmation({ id, message, clickAction }: { id: string; message: string; clickAction: () => void }) {
    return <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-center">{message}</h3>
            <div className="mt-5">
                <form method="dialog" className="flex justify-center gap-x-5">
                    <button className="btn btn-error">Tidak</button>
                    <button onClick={clickAction} className="btn btn-success">Ya</button>
                </form>
            </div>
        </div>
    </dialog>
}

export function openModal(id: string) {
    const modal: any = document.getElementById(id)
    if (modal) { modal.showModal() }
}