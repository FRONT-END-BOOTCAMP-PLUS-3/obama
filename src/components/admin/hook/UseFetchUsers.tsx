import { useState, useEffect } from "react";
import { fetchClient } from "@/utils/api/fetchClient";

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

export const useFetchUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchClient<undefined, { users: User[] }>("/api/admin/user", {
          method: "GET",
        });

        if (response.status === 200 && response.data) {
          setData(response.data.users);
        } else {
          console.error("유저 목록 가져오기 실패:", response.error);
          setError(response.error || "유저 데이터를 불러올 수 없습니다.");
        }
      } catch (err) {
        console.error("유저 목록 가져오기 중 오류 발생:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { data, isLoading, error, setData };
};
