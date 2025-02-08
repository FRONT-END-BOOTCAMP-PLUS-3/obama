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

const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  role: null,
  isAuthenticated: false,
  isAdmin: false,
  setAuth: (userId, role) =>
    set({ 
        userId, 
        role, 
        isAuthenticated: true, 
        isAdmin: role === "admin" 
    }),
  clearAuth: () => 
    set({ 
        userId: null, 
        role: null, 
        isAuthenticated: false,
        isAdmin: false, 
    }),
}));

export default useAuthStore;
