import useAuthStore from "@/store/authStore";

export const logout = () => {
    const { clearAuth } = useAuthStore.getState();

    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    clearAuth();

    window.location.href = "/";

}