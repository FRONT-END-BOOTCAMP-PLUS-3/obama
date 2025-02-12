import { Icon } from "@/components/admin/AdminOpenQuestion.Style";

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

type HandleDeleteClick = (userId: string) => void;

export const getAdminTableColumns = (handleDeleteClick: HandleDeleteClick) => [
  { header: "번호", key: "index" as const },
  { header: "이름", key: "name" as const },
  { header: "이메일", key: "email" as const },
  { header: "전화번호", key: "phone" as const },
  { header: "생년월일", key: "birthDate" as const },
  {
    header: "삭제",
    key: "delete" as const,
    render: (_value: string | number, row: User) => (
      <Icon src="/icons/editTrashcan.svg" alt="Delete" onClick={() => handleDeleteClick(row.userId)} />
    ),
  },
];
