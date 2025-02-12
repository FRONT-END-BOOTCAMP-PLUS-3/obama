"use client";
import React, { useMemo, useState } from "react";
import Pagination from "@/components/admin/pagenation/Pagenation";
import SearchBar from "@/components/admin/searchbar/Searchbar";
import AdminLayoutContainer from "@/components/admin/AdminLayoutContainer";
import ConfirmDeleteModal from "@/components/admin/deletemodal/ConfirmDeleteModal";
import AdminTable from "@/components/admin/table/Table";
import UseAdminAuth from "@/components/admin/hook/UseAdminAuth";
import { useDeleteUser } from "@/components/admin/hook/UseDeleteUser";
import { useFetchUsers } from "@/components/admin/hook/UseFetchUsers";
import { getAdminTableColumns } from "@/components/admin/UserTable"; 

const ROWS_PER_PAGE = 10;

const AdminUser: React.FC = () => {
  UseAdminAuth();

  const { data, isLoading, error, setData } = useFetchUsers();
  const [currentPage, setCurrentPage] = useState(1);

  const { isDeleteModalOpen, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel } =
    useDeleteUser(setData);

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

  return (
    <AdminLayoutContainer>
      <SearchBar placeholder="이름 또는 이메일을 입력해주세요." />

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <AdminTable data={currentData} columns={getAdminTableColumns(handleDeleteClick)} /> {/* ✅ 적용 */}
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </>
      )}

      <ConfirmDeleteModal $isOpen={isDeleteModalOpen} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
    </AdminLayoutContainer>
  );
};

export default AdminUser;
