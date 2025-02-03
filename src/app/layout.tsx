"use client";

import { usePathname } from "next/navigation";
import "../styles/global.css";
import LayoutContainer from "../components/common/LayoutContainer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        {!isAdminPage ? (
          <LayoutContainer>{children}</LayoutContainer>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
