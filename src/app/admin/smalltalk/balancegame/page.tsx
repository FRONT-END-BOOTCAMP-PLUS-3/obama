"use client";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import Pagination from "@/components/admin/pagenation/Pagenation";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import TextField from "@/components/common/textField/TextField";
import { Button } from "@/components/common/button";
import AdminTable from "@/components/admin/table/Table";
import { Icon, AddButton } from "@/components/admin/AdminBalanceGame.Style";
import BalancegameModal from "@/components/admin/balancegamemodal/BalancegameModal";
import { fetchClient } from "@/utils/api/fetchClient";

const ROWS_PER_PAGE = 10;

interface RowData {
  id: number; 
  questionId: number; 
  question: string;
  answerTitle: string;
  answerText: string;
}

const AdminBalancegame: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<RowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{
    question: string;
    answerTitle: string;
    answerText: string;
  }>({ question: "", answerTitle: "", answerText: "" });


  const handleFetchData = useCallback(async () => {
    const { status, data: result, error } = await fetchClient<
      undefined,
      {
        balancegamequestionId: number;
        balancegamequestionText: string;
        answers: {
          balancegameanswerId: number;
          balancegameanswerTitle: string;
          balancegameanswerText: string;
        }[];
      }[]
    >("/api/admin/smalltalk/balancegame", {
      queryParams: { subjectId: 1 },
      method: "GET",
    });

    if (status === 200 && result) {
      const transformedData = result
        .flatMap((questionItem) =>
          questionItem.answers.map((answerItem) => ({
            id: answerItem.balancegameanswerId,
            questionId: questionItem.balancegamequestionId,
            question: questionItem.balancegamequestionText,
            answerTitle: answerItem.balancegameanswerTitle,
            answerText: answerItem.balancegameanswerText,
          }))
        )
        .sort((a, b) => a.id - b.id);

      setData(transformedData);
    } else {
      console.error("Error fetching balancegame data:", error);
    }
  }, []);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const currentData = useMemo(
    () =>
      data.slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE
      ),
    [data, currentPage]
  );

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);


  const handleDeleteClick = useCallback((id: number) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  }, []);


  const handleDeleteConfirm = useCallback(async () => {
    if (selectedId !== null) {
      const currentRow = data.find((item) => item.id === selectedId);
      if (!currentRow) return;

      const { status, data: resData, error } = await fetchClient<
        any,
        { message?: string; error?: string }
      >("/api/admin/smalltalk/balancegame", {
        method: "DELETE",
        body: { questionId: currentRow.questionId },
      });

      if (status === 200) {
        setData((prev) =>
          prev.filter((item) => item.questionId !== currentRow.questionId)
        );
        setIsDeleteModalOpen(false);
        setSelectedId(null);
        alert("Balancegame Delete success!");
      } else {
        console.error("Delete failed:", error || resData?.error);
        alert("Balancegame Delete failed!");
      }
    }
  }, [selectedId, data]);

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


  const handleSaveEdit = async () => {
    if (editingId !== null) {
      const currentRow = data.find((item) => item.id === editingId);
      if (!currentRow) return;

      const { status, data: resData, error } = await fetchClient<
        any,
        { message?: string; error?: string }
      >("/api/admin/smalltalk/balancegame", {
        method: "PATCH",
        body: {
          questionId: currentRow.questionId,
          questionText: editedData.question,
          answerId: currentRow.id,
          answerTitle: editedData.answerTitle,
          answerText: editedData.answerText,
        },
      });

      if (status === 200) {
        setData((prev) =>
          prev
            .map((row) =>
              row.id === currentRow.id
                ? {
                    ...row,
                    question: editedData.question,
                    answerTitle: editedData.answerTitle,
                    answerText: editedData.answerText,
                  }
                : row
            )
            .sort((a, b) => a.id - b.id)
        );
        setEditingId(null);
        setEditedData({ question: "", answerTitle: "", answerText: "" });
        alert("수정에 성공했습니다!");
      } else {
        console.error("Update failed:", error || resData?.error);
        alert("수정에 실패했습니다!");
      }
    }
  };

  const columns = [
    { header: "ID", key: "id" as const, className: "id-column" },
    {
      header: "질문",
      key: "question" as const,
      className: "question-column",
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
      className: "answer-title-column",
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
      className: "answer-text-column",
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
      className: "edit-column",
      render: (_value: string | number, row: RowData) =>
        editingId === row.id ? (
          <Button onClick={handleSaveEdit}>저장</Button>
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
      className: "delete-column",
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
      <BalancegameModal
        $isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSuccess={() => {
          handleFetchData();
        }}
      />
      <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
    </AdminLayoutContainer>
  );
};

export default AdminBalancegame;
