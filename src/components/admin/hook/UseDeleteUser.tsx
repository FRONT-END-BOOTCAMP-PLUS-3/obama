import { useState, useCallback } from "react";
import { fetchClient } from "@/utils/api/fetchClient";
import useAuthStore from "@/store/authStore";

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

export const useDeleteUser = (setData: React.Dispatch<React.SetStateAction<User[]>>) => {
  const { role } = useAuthStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);


  const handleDeleteClick = useCallback((userId: string) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  }, []);


  const handleDeleteConfirm = useCallback(async () => {
    if (!selectedUserId) return;

    if (!role) {
      console.error("삭제 요청 실패: role 값이 없음");
      alert("삭제 권한이 없습니다.");
      return;
    }

    const response = await fetchClient<{ userId: string; role: string }, { message: string }>(
      "/api/admin/user",
      {
        method: "DELETE",
        body: { userId: selectedUserId, role },
      }
    );

    if (response.status === 200) {
      setData((prev) => prev.filter((user) => user.userId !== selectedUserId));
      setIsDeleteModalOpen(false);
      setSelectedUserId(null);
      alert("User delete success!");
    } else {
      console.error("User delete failed:", response.error);
    }
  }, [selectedUserId, role, setData]);


  const handleDeleteCancel = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  }, []);

  return {
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};
