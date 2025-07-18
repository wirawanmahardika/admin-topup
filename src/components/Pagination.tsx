interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 1; // jumlah halaman sebelum dan sesudah currentPage yang ditampilkan

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1); // selalu tampilkan halaman pertama

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages); // selalu tampilkan halaman terakhir
    }

    return pages;
  };

  const pagesToRender = getPageNumbers();

  return (
    <div className="flex justify-center mt-4 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        className="btn btn-sm"
      >
        Previous
      </button>

      {pagesToRender.map((page, idx) => {
        if (typeof page === "string") {
          return (
            <span key={`ellipsis-${idx}`} className="btn btn-sm btn-disabled">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`btn btn-sm ${
              currentPage === page ? "btn-primary" : ""
            }`}
          >
            {page}
          </button>
        );
      })}

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
