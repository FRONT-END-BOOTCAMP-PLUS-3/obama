"use client";

import { usePathname } from "next/navigation";
import "../styles/global.css";
import LayoutContainer from "../components/common/LayoutContainer";
import StyledComponentsRegistry from "@/lib/registry";

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
        )}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
