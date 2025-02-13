"use client";
import React, { useState, useEffect, useMemo } from "react";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import AdminTable from "@/components/admin/table/Table";
import Pagination from "@/components/admin/pagenation/Pagenation";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import { RowData, UseBalancegame } from "@/components/admin/hook/UseBalancegame";
import { createColumns } from "@/components/admin/BalancegameTable";
import BalancegameModal from "@/components/admin/balancegamemodal/BalancegameModal";
import { AddButton } from "@/components/admin/AdminBalanceGame.Style";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import UseAdminAuth from "@/components/admin/hook/UseAdminAuth";

const ROWS_PER_PAGE = 10;

const AdminBalancegame: React.FC = () => {
  UseAdminAuth();
  const {
    data,
    currentPage,
    setCurrentPage,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editingId,
    setEditingId,
    editedData,
    setEditedData,
    handleSaveEdit,
    handleDelete,
    isModalOpen, 
    setIsModalOpen, 
    handleFetchData,
    handleDeleteClick
  } = UseBalancegame();

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data); // 데이터 변경 시 초기화
  }, [data]);

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);

  const currentData = useMemo(
    () => filteredData.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE),
    [filteredData, currentPage]
  );

  const handleEdit = (id: number, row: RowData) => {
    setEditingId(id); 
    setEditedData({ 
      question: row.question,
      answerTitle: row.answerTitle,
      answerText: row.answerText,
    });
  };

  const handleSearch = (searchType: string, query: string) => {
    if (!query.trim()) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      searchType === "ID"
        ? item.id.toString().includes(query) 
        : searchType === "질문명"
        ? item.question.includes(query) 
        : searchType === "답변 제목"
        ? item.answerTitle.includes(query) 
        : item.answerText.includes(query) 
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const columns = createColumns(
    editingId, 
    editedData,
    setEditedData, 
    handleSaveEdit, 
    handleEdit, 
    handleDeleteClick
  );

  return (
    <AdminLayoutContainer>
      <SearchBar 
        placeholder="ID, 질문명, 답변 제목, 답변 텍스트를 입력해주세요."
        options={["ID", "질문명", "답변 제목", "답변 텍스트"]}
        onSearch={handleSearch}
      />
      <AdminTable data={currentData} columns={columns} />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      <ConfirmDeleteModal 
        $isOpen={isDeleteModalOpen} 
        onConfirm={handleDelete} 
        onCancel={() => setIsDeleteModalOpen(false)} 
      />
      <BalancegameModal
        $isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSuccess={handleFetchData} 
      />
      <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
    </AdminLayoutContainer>
  );
};

export default AdminBalancegame;
