"use client";
import React, { useState, useMemo, useCallback } from "react";
import Pagination from "@/components/admin/pagenation/Pagenation";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import AdminTable from "@/components/admin/table/Table";
import { Icon } from "@/components/AdminOpenQuestion.Style";

// DB연결 및 BE 과정에서 usecase로 분리 및 수정이 이루어질 페이지 입니다.

const ROWS_PER_PAGE = 10;

const AdminUser: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [selectedId, setSelectedId] = useState<number | null>(null); 
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState(
    Array.from({ length: 87 }, (_, index) => ({
      id: index + 1,
      name: `홍길동 ${index + 1}`,
      email: `test${index + 1}@test.com`,
      phone: "000-0000-0000",
      dob: "2025.01.24",
    }))
  );

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  const handleDeleteClick = useCallback((id: number) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    setData((prev) => prev.filter((item) => item.id !== selectedId));
    setIsDeleteModalOpen(false);
    setSelectedId(null);
  }, [selectedId]);

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedId(null);
  };


  const currentData = useMemo(
    () => data.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE),
    [data, currentPage]
  );

  const columnsForUserTable = [
    { header: "번호", key: "id" as const },
    { header: "이름", key: "name" as const },
    { header: "이메일", key: "email" as const },
    { header: "전화번호", key: "phone" as const },
    { header: "생년월일", key: "dob" as const },
    {
      header: "삭제",
      key: "delete" as const,
      render: (_value: string | number, row: { id: number }) => (
        <Icon
          src="/icons/editTrashcan.svg"
          alt="Delete"
          onClick={() => handleDeleteClick(row.id)}
        />
      ),
    },
  ];

  return (
    <AdminLayoutContainer>
      <SearchBar placeholder="이름 또는 이메일을 입력해주세요." />
      <AdminTable data={currentData} columns={columnsForUserTable} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ConfirmDeleteModal
        $isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </AdminLayoutContainer>
  );
};

export default AdminUser;
