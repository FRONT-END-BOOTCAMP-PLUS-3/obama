"use client";
import React, { useCallback, useState, useMemo } from "react";
import Pagination from "@/components/admin/pagenation/Pagenation";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import TextField from "@/components/common/textField/TextField";
import { Button } from "@/components/common/button";
import { Icon } from "@/components/admin/AdminOpenQuestion.Style";
import AdminTable from "@/components/admin/table/Table";
import { AddButton } from "@/components/admin/AdminOpenQuestion.Style";
import BalanceGame from "@/components/smaltalk/BalanceGame";
import BalancegameModal from "@/components/admin/balancegamemodal/BalancegameModal";

const ROWS_PER_PAGE = 10;

interface RowData {
  id: number;
  question: string;
  answerTitle: string;
  answerText: string;
}

const AdminBalancegame: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<RowData[]>(
    Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      question: `질문 ${index + 1}`,
      answerTitle: `답변 제목 ${index + 1}`,
      answerText: `답변 텍스트 ${index + 1}`,
    }))
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{
    question: string;
    answerTitle: string;
    answerText: string;
  }>({ question: "", answerTitle: "", answerText: "" });

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  const currentData = useMemo(
    () => data.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE),
    [data, currentPage]
  );

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

  const handleEdit = useCallback((id: number, row: RowData) => {
    setEditingId(id);
    setEditedData({
      question: row.question,
      answerTitle: row.answerTitle,
      answerText: row.answerText,
    });
  }, []);

  const handleSaveEdit = () => {
    if (editingId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...editedData }
            : item
        )
      );
      setEditingId(null);
      setEditedData({ question: "", answerTitle: "", answerText: "" });
    }
  };

  const columns = [
    { header: "ID", key: "id" as const },
    {
      header: "질문",
      key: "question" as const,
      render: (_value: string | number, row: RowData) =>
        editingId === row.id ? (
          <TextField
            name={`edit-question-${row.id}`}
            value={editedData.question}
            onChange={(_, value) =>
              setEditedData((prev) => ({ ...prev, question: value }))
            }
            autoFocus
          />
        ) : (
          row.question
        ),
    },
    {
      header: "답변 제목",
      key: "answerTitle" as const,
      render: (_value: string | number, row: RowData) =>
        editingId === row.id ? (
          <TextField
            name={`edit-answerTitle-${row.id}`}
            value={editedData.answerTitle}
            onChange={(_, value) =>
              setEditedData((prev) => ({ ...prev, answerTitle: value }))
            }
          />
        ) : (
          row.answerTitle
        ),
    },
    {
      header: "답변 텍스트",
      key: "answerText" as const,
      render: (_value: string | number, row: RowData) =>
        editingId === row.id ? (
          <TextField
            name={`edit-answerText-${row.id}`}
            value={editedData.answerText}
            onChange={(_, value) =>
              setEditedData((prev) => ({ ...prev, answerText: value }))
            }
          />
        ) : (
          row.answerText
        ),
    },
    {
      header: "수정",
      key: "edit" as const,
      render: (_value: string | number, row: RowData) =>
        editingId === row.id ? (
          <Button onClick={handleSaveEdit}>수정완료</Button>
        ) : (
          <Icon
            src="/icons/editPen.svg"
            alt="Edit"
            onClick={() => handleEdit(row.id, row)}
          />
        ),
    },
    {
      header: "삭제",
      key: "delete" as const,
      render: (_value: string | number, row: RowData) => (
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
      <SearchBar placeholder="ID 또는 질문명을 입력해주세요." />
      <AdminTable data={currentData} columns={columns} />
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
      <BalancegameModal $isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddButton onClick={handleOpenModal}>+</AddButton>
    </AdminLayoutContainer>
  );
};

export default AdminBalancegame;
