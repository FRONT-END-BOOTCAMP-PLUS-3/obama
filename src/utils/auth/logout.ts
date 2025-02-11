import useAuthStore from "@/store/authStore";

export const logout = () => {
    const { clearAuth } = useAuthStore.getState();

    clearAuth();

    window.location.href = "/";

}