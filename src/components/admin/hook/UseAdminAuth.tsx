import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const UseAdminAuth = () => {
  const { isAdmin, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      alert("관리자만 접근할 수 있습니다.");
      router.push("/");
    }
  }, [isAdmin, isAuthenticated, router]);
};

export default UseAdminAuth;
