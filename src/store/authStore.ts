import { UserRole } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
  userId: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setAuth: (userId: string, role: UserRole) => void;
  clearAuth: () => void;
}

// ✅ 초기 상태를 `localStorage`에서 가져오기
const getInitialAuthState = (): { userId: string | null; role: UserRole | null } => {
  if (typeof window !== "undefined") { // ✅ 브라우저 환경에서만 실행
    return {
      userId: localStorage.getItem("userId"),
      role: localStorage.getItem("role") as UserRole | null,
    };
  }
  return { userId: null, role: null };
};

const useAuthStore = create<AuthState>((set) => {
  const initialAuth = getInitialAuthState(); // ✅ 초기 값 설정

  return {
    userId: initialAuth.userId,
    role: initialAuth.role,
    isAuthenticated: !!initialAuth.userId,
    isAdmin: initialAuth.role === "admin",
    
    setAuth: (userId, role) => {
      console.log("🔥 setAuth 실행됨 → userId:", userId, "role:", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      set({ userId, role, isAuthenticated: true, isAdmin: role === "admin" });
    },

    clearAuth: () => {
      console.log("🚀 clearAuth 실행됨 → 로그아웃");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      set({ userId: null, role: null, isAuthenticated: false, isAdmin: false });
    },
  };
});

export default useAuthStore;
