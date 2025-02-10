import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

const ProtectedRoute = ({children, adminOnly= false}: ProtectedRouteProps) => {

    const {isAuthenticated, isAdmin} = useAuthStore();
    const router = useRouter();

    useEffect(()=>{
        if(!isAuthenticated) {
            alert("로그인을 해주세요")
            router.push("/login");
        } else if(adminOnly && !isAdmin){
            alert("관리자만 접근 가능합니다.");
            router.push("/profile")
        }
    }, [isAuthenticated, isAdmin, router, adminOnly]);

    return <>{children}</>
}
export default ProtectedRoute