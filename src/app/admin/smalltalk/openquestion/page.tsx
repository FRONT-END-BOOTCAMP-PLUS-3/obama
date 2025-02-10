"use client";
import React, { useCallback, useState, useEffect, useMemo } from "react";
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
import { OpenQuestionDto } from "@/application/usecases/smalltalk/dto/OpenQuestion";

const ROWS_PER_PAGE = 10;

const AdminOpenQuestion: React.FC = () => {
  const [data, setData] = useState<OpenQuestionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  const fetchAllOpenQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/smalltalk/openquestion");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.questions);
    } catch (error) {
      console.error("Error fetching open questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOpenQuestions();
  }, []);

  const handleAddQuestion = async (subjectId: number, openQuestion: string) => {
    try {
      const response = await fetch("/api/admin/smalltalk/openquestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectId, openQuestion }), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add question");
      }
      alert("Question added successfully!");
      await fetchAllOpenQuestions();
    } catch (error) {
      console.error(" Error adding question:", error);
    }
  };
  

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteClick = useCallback((id: number) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedId !== null) {
      setData((prev) => prev.filter((item) => item.openquestionId !== selectedId));
      setIsDeleteModalOpen(false);
      setSelectedId(null);
    }
  }, [selectedId]);

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedId(null);
  };

  const handleEdit = useCallback((id: number, openQuestion: string) => {
    setEditingId(id);
    setEditedValue(openQuestion);
  }, []);

  const handleSaveEdit = () => {
    if (editingId !== null) {
      setData((prev) => {
        const newData = prev.map((item) =>
          item.openquestionId === editingId ? { ...item, openQuestion: editedValue } : item
        );
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
    { header: "Subject ID", key: "subjectId" as const },
    {
      header: "주제명",
      key: "openQuestion" as const,
      render: (_value: string | number, row: OpenQuestionDto) =>
        editingId === row.openquestionId ? (
          <TextField
            name={`edit-${row.openquestionId}`}
            value={editedValue}
            onChange={(_, value) => setEditedValue(value)}
            placeholder="주제명을 입력하세요"
            autoFocus
            size="XXL"
          />
        ) : (
          row.openQuestion
        ),
    },
    {
      header: "수정",
      key: "edit" as const,
      render: (_value: string | number, row: OpenQuestionDto) =>
        editingId === row.openquestionId ? (
          <Button onClick={handleSaveEdit}>수정 완료</Button>
        ) : (
          <Icon
            src="/icons/editPen.svg"
            alt="Edit"
            onClick={() => handleEdit(row.openquestionId, row.openQuestion)}
          />
        ),
    },
    {
      header: "삭제",
      key: "delete" as const,
      render: (_value: string | number, row: OpenQuestionDto) => (
        <Icon
          src="/icons/editTrashcan.svg"
          alt="Delete"
          onClick={() => handleDeleteClick(row.openquestionId)}
        />
      ),
    },
  ];
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayoutContainer>
      <SearchBar placeholder="subjectId, 주제명을 입력해주세요." />
      <AdminTable data={currentData} columns={columnsForEditTable} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <AddButton onClick={handleOpenModal}>+</AddButton>
      <OpenQuestionModal
        $isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddQuestion} 
      />
      <ConfirmDeleteModal
        $isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </AdminLayoutContainer>
  );
};

export default AdminOpenQuestion;
