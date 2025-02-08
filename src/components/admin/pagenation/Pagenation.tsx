import React from "react";
import { PaginationContainer, PageButton } from "@/components/admin/pagenation/Pagenation.Style";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      return (
        <PageButton
          key={pageNumber}
          $isActive={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </PageButton>
      );
    });
  };

  return (
    <PaginationContainer>
      <PageButton $isActive={false} onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </PageButton>
      {renderPageNumbers()}
      <PageButton $isActive={false} onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
