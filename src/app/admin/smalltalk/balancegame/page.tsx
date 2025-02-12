"use client";
import React from "react";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import AdminTable from "@/components/admin/table/Table";
import Pagination from "@/components/admin/pagenation/Pagenation";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import { RowData, UseBalancegame } from "@/components/admin/hook/UseBalancegame";
import { createColumns } from "@/components/admin/BalancegameTable";
import BalancegameModal from "@/components/admin/balancegamemodal/BalancegameModal";
import { AddButton } from "@/components/admin/AdminBalanceGame.Style";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import useAdminAuth from "@/components/admin/hook/useAdminAuth";

const ROWS_PER_PAGE = 10;

const AdminBalancegame: React.FC = () => {
  useAdminAuth();
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

  const handleEdit = (id: number, row: RowData) => {
    setEditingId(id); 
    setEditedData({ 
      question: row.question,
      answerTitle: row.answerTitle,
      answerText: row.answerText,
    });
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
      <SearchBar placeholder="ID 또는 질문명을 입력해주세요." />
      <AdminTable data={data} columns={columns} />
      <Pagination totalPages={Math.ceil(data.length / ROWS_PER_PAGE)} currentPage={currentPage} onPageChange={setCurrentPage} />
      <ConfirmDeleteModal $isOpen={isDeleteModalOpen} onConfirm={handleDelete} onCancel={() => setIsDeleteModalOpen(false)} />
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
