import useAuthStore from "@/store/authStore";
import { UserRole } from "@/types/auth";

export const autoLogin = () => {
    const { setAuth } = useAuthStore.getState();

    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role')as UserRole | null;

    if(storedUserId && storedRole) {
        setAuth(storedUserId, storedRole);
    }
}