"use client";

import { usePathname } from "next/navigation";
import "../styles/global.css";
import LayoutContainer from "../components/common/LayoutContainer";
import StyledComponentsRegistry from "@/lib/registry";

// 관리자 접근제한
// import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin"); 

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
        {!isAdminPage ? (
          <LayoutContainer>{children}</LayoutContainer>
        ) : (
          children
          // <ProtectedRoute adminOnly>{children}</ProtectedRoute>
        )}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
