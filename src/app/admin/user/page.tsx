"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Pagination from "@/components/admin/pagenation/Pagenation";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import AdminTable from "@/components/admin/table/Table";
import { Icon } from "@/components/admin/AdminOpenQuestion.Style";
import useAdminAuth from "@/components/admin/hook/useAdminAuth";
import { fetchClient } from "@/utils/api/fetchClient";
import useAuthStore from "@/store/authStore";

const ROWS_PER_PAGE = 10;

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

const fetchUsers = async () => {
  const response = await fetchClient<undefined, { users: User[] }>("/api/admin/user", {
    method: "GET",
  });

  if (response.status === 200 && response.data) {
    return response.data.users;
  } else {
    console.error("유저 목록 가져오기 실패:", response.error);
    return [];
  }
};

const AdminUser: React.FC = () => {
  useAdminAuth(); 

  const {role} = useAuthStore();

  const [data, setData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers().then(setData);
  }, []);

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
  const currentData = useMemo(
    () =>
      data
        .slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)
        .map((user, index) => ({
          ...user,
          index: (currentPage - 1) * ROWS_PER_PAGE + index + 1, 
        })),
    [data, currentPage]
  );

  const handleDeleteClick = useCallback((userId: string) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!selectedUserId) return;

    if (!role) {
      console.error("❌ 삭제 요청 실패: role 값이 없음");
      alert("삭제 권한이 없습니다.");
      return;
    }

    const response = await fetchClient<{ userId: string, role : string }, { message: string }>("/api/admin/user", {
      method: "DELETE",
      body: { userId: selectedUserId ,role },
    });

    if (response.status === 200) {
      setData((prev) => prev.filter((user) => user.userId !== selectedUserId));
      setIsDeleteModalOpen(false);
      setSelectedUserId(null);
      alert("User delete success!")
    } else {
      console.error(" User delete failed : ", response.error);
    }
  }, [selectedUserId, role]);

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  const columnsForUserTable = [
    { header: "번호", key: "index" as const }, 
    { header: "이름", key: "name" as const },
    { header: "이메일", key: "email" as const },
    { header: "전화번호", key: "phone" as const },
    { header: "생년월일", key: "birthDate" as const },
    {
      header: "삭제",
      key: "delete" as const,
      render: (_value: string | number, row: { userId: string }) => (
        <Icon
          src="/icons/editTrashcan.svg"
          alt="Delete"
          onClick={() => handleDeleteClick(row.userId)}
        />
      ),
    },
  ];

  return (
    <AdminLayoutContainer>
      <SearchBar placeholder="이름 또는 이메일을 입력해주세요." />
      <AdminTable data={currentData} columns={columnsForUserTable} />
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
    </AdminLayoutContainer>
  );
};

export default AdminUser;
