import { OpenQuestionDto } from "@/application/usecases/smalltalk/dto/OpenQuestion";
import TextField from "@/components/common/textField/TextField";
import { Button } from "@/components/common/button";
import { Icon } from "@/components/admin/AdminOpenQuestion.Style";

export function EditOpenQuestionTable({
  editingId,
  editedValue,
  setEditedValue,
  handleSaveEdit,
  handleEdit,
  handleDeleteClick
}: {
  editingId: number | null;
  editedValue: string;
  setEditedValue: (value: string) => void;
  handleSaveEdit: () => void;
  handleEdit: (id: number, openQuestion: string) => void;
  handleDeleteClick: (id: number) => void;
}) {
  return [
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
}
