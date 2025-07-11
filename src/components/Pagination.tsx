interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const handleClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-4 gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => handleClick(currentPage - 1)}
                className="btn btn-sm"
            >
                Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => handleClick(i + 1)}
                    className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                onClick={() => handleClick(currentPage + 1)}
                className="btn btn-sm"
            >
                Next
            </button>
        </div>
    );
};
