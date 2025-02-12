import useAuthStore from "@/store/authStore";
import { UserRole } from "@/types/auth";
import { useEffect } from "react";

export const useAutoLogin = () => {
  const { setAuth, userId } = useAuthStore();

  useEffect(() => {
      if (!userId) { // ✅ `userId`가 없을 때만 실행 (중복 호출 방지)
          const storedUserId = localStorage.getItem("userId");
          const storedRole = localStorage.getItem("role");

          if (storedUserId && storedRole) {
              console.log("🔥 autoLogin 실행 → userId:", storedUserId);
              setAuth(storedUserId, storedRole as UserRole);
          } else {
              console.log("❌ autoLogin 실패 → userId 없음");
          }
      }
  }, [userId]); // ✅ `userId`가 변경될 때마다 실행
};
