export function ConfirmModal({
    open,
    onClose,
    onConfirm,
    brandName,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    brandName: string;
}) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-base-100 rounded-lg shadow p-6 w-full max-w-sm">
                <h3 className="font-bold text-lg mb-2">Konfirmasi Hapus</h3>
                <p className="mb-4">Yakin ingin menghapus brand <span className="font-semibold">{brandName}</span>?</p>
                <div className="flex justify-end gap-2">
                    <button className="btn btn-ghost" onClick={onClose}>Batal</button>
                    <button className="btn btn-error" onClick={onConfirm}>Hapus</button>
                </div>
            </div>
        </div>
    );
}
