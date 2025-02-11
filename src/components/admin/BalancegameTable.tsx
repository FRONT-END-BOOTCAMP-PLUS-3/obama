import { RowData } from "@/components/admin/hook/UseBalancegame";
import TextField from "@/components/common/textField/TextField";
import { Button } from "@/components/common/button";
import { Icon } from "@/components/admin/AdminBalanceGame.Style";

export const createColumns = (
  editingId: number | null,
  editedData: { question: string; answerTitle: string; answerText: string },
  setEditedData: (data: any) => void,
  handleSaveEdit: () => void,
  handleEdit: (id: number, row: RowData) => void,
  handleDeleteClick: (id: number) => void,
) => [
  { header: "ID", key: "id" as keyof RowData, className: "id-column" },
  {
    header: "질문",
    key: "question" as keyof RowData,
    className: "question-column",
    render: (_value: string | number, row: RowData) =>
      editingId === row.id ? (
        <TextField
          name={`edit-question-${row.id}`}
          value={editedData.question}
          onChange={(_, value) =>
            setEditedData((prev: typeof editedData) => ({ ...prev, question: value }))
          }
        />
      ) : (
        row.question
      ),
  },
  {
    header: "답변 제목",
    key: "answerTitle" as keyof RowData,
    className: "answer-title-column",
    render: (_value: string | number, row: RowData) =>
      editingId === row.id ? (
        <TextField
          name={`edit-answerTitle-${row.id}`}
          value={editedData.answerTitle}
          onChange={(_, value) =>
            setEditedData((prev: typeof editedData) => ({ ...prev, answerTitle: value }))
          }
        />
      ) : (
        row.answerTitle
      ),
  },
  {
    header: "답변 텍스트",
    key: "answerText" as keyof RowData,
    className: "answer-text-column",
    render: (_value: string | number, row: RowData) =>
      editingId === row.id ? (
        <TextField
          name={`edit-answerText-${row.id}`}
          value={editedData.answerText}
          onChange={(_, value) =>
            setEditedData((prev: typeof editedData) => ({ ...prev, answerText: value }))
          }
        />
      ) : (
        row.answerText
      ),
  },
  {
    header: "수정",
    key: "edit" as "edit",
    className: "edit-column",
    render: (_value: string | number, row: RowData) =>
      editingId === row.id ? (
        <Button onClick={handleSaveEdit}>저장</Button>
      ) : (
        <Icon src="/icons/editPen.svg" alt="Edit" onClick={() => handleEdit(row.id, row)} />
      ),
  },
  {
    header: "삭제",
    key: "delete" as "delete",
    className: "delete-column",
    render: (_value: string | number, row: RowData) => (
      <Icon src="/icons/editTrashcan.svg" alt="Delete" onClick={() => handleDeleteClick(row.id)} />
    ),
  },
];
