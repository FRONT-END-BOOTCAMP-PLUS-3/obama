import React from "react";
import { PaginationContainer, PageButton } from "@/components/admin/pagenation/Pagenation.Style";

interface PaginationProps {
  totalPages: number; 
  currentPage: number;
  onPageChange: (page: number) => void; 
}

const MAX_VISIBLE_PAGES = 5; 

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
    const currentGroup = Math.floor((currentPage - 1) / MAX_VISIBLE_PAGES);
    const startPage = currentGroup * MAX_VISIBLE_PAGES + 1;
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
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
