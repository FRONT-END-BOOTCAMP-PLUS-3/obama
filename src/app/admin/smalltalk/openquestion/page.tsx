"use client";
import React, { useEffect, useState, useMemo } from "react";
import Pagination from "@/components/admin/pagenation/Pagenation";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import OpenQuestionModal from "@/components/admin/openquestionmodal/OpenQuestionModal";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import AdminTable from "@/components/admin/table/Table";
import { AddButton } from "@/components/admin/AdminOpenQuestion.Style";
import { UseOpenQuestion } from "@/components/admin/hook/UseOpenQuestion";
import { UseModal } from "@/components/admin/hook/UseModals";
import { EditOpenQuestionTable } from "@/components/admin/EditOpenQuestionTable";
import useAdminAuth from "@/components/admin/hook/useAdminAuth";

const ROWS_PER_PAGE = 10;

const AdminOpenQuestion: React.FC = () => {
  useAdminAuth();

  const { data, loading, fetchAllOpenQuestions, createQuestion, updateQuestion, deleteQuestion } =
    UseOpenQuestion(); 

  const createModal = UseModal();
  const deleteModal = UseModal();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
  
  const currentData = useMemo(
    () => data.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE),
    [data, currentPage]
  );

  useEffect(() => {
    fetchAllOpenQuestions();
  }, [fetchAllOpenQuestions]);

  const handleEdit = (id: number, openQuestion: string) => {
    setEditingId(id);
    setEditedValue(openQuestion);
  };

  const handleSaveEdit = async () => {
    if (editingId !== null) {
      await updateQuestion(editingId, editedValue);
      setEditingId(null);
      setEditedValue("");
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedId !== null) {
      await deleteQuestion(selectedId);
      deleteModal.closeModal();
      setSelectedId(null);
    }
  };


  const columnsForEditTable = EditOpenQuestionTable({
    editingId,
    editedValue,
    setEditedValue,
    handleSaveEdit,
    handleEdit,
    handleDeleteClick: (id: number) => {
      setSelectedId(id);
      deleteModal.openModal();
    },
  });
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayoutContainer>
      <SearchBar placeholder="subjectId, 주제명을 입력해주세요." />
      <AdminTable data={currentData} columns={columnsForEditTable} />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      <AddButton onClick={createModal.openModal}>+</AddButton>
      <OpenQuestionModal
        $isOpen={createModal.isOpen}
        onClose={createModal.closeModal}
        onSubmit={createQuestion}
      />
      <ConfirmDeleteModal
        $isOpen={deleteModal.isOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={deleteModal.closeModal}
      />
    </AdminLayoutContainer>
  );
};

export default AdminOpenQuestion;
