import { useState, useCallback, useEffect, useMemo } from "react";
import { fetchClient } from "@/utils/api/fetchClient";

export interface RowData {
  id: number;
  questionId: number;
  question: string;
  answerTitle: string;
  answerText: string;
}

export const UseBalancegame = () => {

  const [data, setData] = useState<RowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState({
    question: "",
    answerTitle: "",
    answerText: "",
  });

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


  const handleSaveEdit = async () => {
    if (editingId !== null) {
      const currentRow = data.find((item) => item.id === editingId);
      if (!currentRow) return;

      const { status, error } = await fetchClient("/api/admin/smalltalk/balancegame", {
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
          prev.map((row) =>
            row.id === currentRow.id
              ? { ...row, question: editedData.question, answerTitle: editedData.answerTitle, answerText: editedData.answerText }
              : row
          )
        );
        setEditingId(null);
        alert("Balancegame Update Success!");
      } else {
        console.error("Update failed:", error);
      }
    }
  };

  const handleDelete = useCallback(async () => {
    if (selectedId !== null) {
      const currentRow = data.find((item) => item.id === selectedId);
      if (!currentRow) return;

      const { status, error } = await fetchClient("/api/admin/smalltalk/balancegame", {
        method: "DELETE",
        body: { questionId: currentRow.questionId },
      });

      if (status === 200) {
        setData((prev) => prev.filter((item) => item.questionId !== currentRow.questionId));
        setIsDeleteModalOpen(false);
        setSelectedId(null);
        alert("Balancegame Delete Success!");
      } else {
        console.error("Delete failed:", error);
      }
    }
  }, [selectedId, data]);

  const handleDeleteClick = useCallback((id: number) => {
    setSelectedId(id); 
    setIsDeleteModalOpen(true); 
  }, []);
  

  return {
    data,
    currentPage,
    setCurrentPage,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedId,
    setSelectedId,
    editingId,
    setEditingId,
    editedData,
    setEditedData,
    handleFetchData,
    handleDelete,
    handleSaveEdit,
    isModalOpen, 
    setIsModalOpen,
    handleDeleteClick
  };
};
