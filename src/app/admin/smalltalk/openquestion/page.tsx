"use client";
import React, { useCallback, useState, useMemo } from "react";
import Pagination from "@/components/admin/pagenation/Pagenation";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import OpenQuestionModal from "@/components/admin/openquestionmodal/OpenQuestionModal";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import TextField from "@/components/common/textField/TextField";
import { Button } from "@/components/common/button";
import { Icon } from "@/components/admin/AdminOpenQuestion.Style";
import AdminTable from "@/components/admin/table/Table";
import { AddButton } from "@/components/admin/AdminOpenQuestion.Style";

// DB연결 및 BE 과정에서 usecase로 분리 및 수정이 이루어질 페이지 입니다.

const ROWS_PER_PAGE = 10;

const AdminOpenQuestion: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [selectedId, setSelectedId] = useState<number | null>(null); 
  const [editingId, setEditingId] = useState<number | null>(null); 
  const [editedValue, setEditedValue] = useState<string>(""); 
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState(
    Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      subject: `주제 ${index + 1}`,
    }))
  );

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleEdit = useCallback((id: number, subject: string) => {
    setEditingId(id);
    setEditedValue(subject);
  }, []);

  const handleSaveEdit = () => {
    if (editingId !== null) {
      setData((prev) => {
        const index = prev.findIndex((item) => item.id === editingId);
        if (index === -1) return prev;
        const newData = [...prev];
        newData[index] = { ...newData[index], subject: editedValue };
        return newData;
      });
      setEditingId(null);
      setEditedValue("");
    }
  };
  

  const currentData = useMemo(
    () => data.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE),
    [data, currentPage]
  );

  const columnsForEditTable = [
    { header: "주제 ID", key: "id" as const },
    {
      header: "주제명",
      key: "subject" as const,
      render: (_value: string | number, row: { id: number; subject: string }) =>
        editingId === row.id ? (
          <TextField
            name={`edit-${row.id}`} 
            value={editedValue}
            onChange={(_, value) => setEditedValue(value)}
            placeholder="주제명을 입력하세요"
            autoFocus
            size="XXL"
          />
        ) : (
          row.subject
        ),
    },
    {
      header: "수정",
      key: "edit" as const,
      render: (_value: string | number, row: { id: number; subject: string }) =>
        editingId === row.id ? (
          <Button onClick={handleSaveEdit}>수정 완료</Button>
        ) : (
          <Icon
            src="/icons/editPen.svg"
            alt="Edit"
            onClick={() => handleEdit(row.id, row.subject)}
          />       
        ),
    },
    {
      header: "삭제",
      key: "delete" as const,
      render: (_value: string | number, row: { id: number; subject: string }) => (
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
      <SearchBar placeholder="subjectId, 질문명을 입력해주세요." />
      <AdminTable data={currentData} columns={columnsForEditTable} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <AddButton onClick={handleOpenModal}>+</AddButton>
      <OpenQuestionModal $isOpen={isModalOpen} onClose={handleCloseModal} />
      <ConfirmDeleteModal
        $isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </AdminLayoutContainer>
  );
};

export default AdminOpenQuestion;
