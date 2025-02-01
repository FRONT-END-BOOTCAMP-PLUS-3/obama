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
  const shouldShowNavBar = pathname !== "/" && !pathname.endsWith("/create");

  return (
    <html lang="en">
      <body>
        <LayoutContainer hasNavBar={shouldShowNavBar}>
          {children}
        </LayoutContainer>
      </body>
    </html>
  );
}
