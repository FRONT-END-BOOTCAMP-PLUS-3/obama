"use client";

import styled from "styled-components";
import NavBar from "./navbar/Navbar";
import { usePathname } from "next/navigation";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: var(--gray-500);
`;

const Page = styled.div<{ $hasNavBar: boolean }>`
  position: relative;
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 5rem;
  background-color: var(--white-color);
  margin-top: 0;
  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHiddenNavBar =
    pathname === "/" ||
    pathname.startsWith("/user/admin") ||
    pathname.startsWith("/user/items") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signUp")||
    pathname.startsWith("/user/withdraw")||
    pathname.startsWith("/user/withdraw/confirm")||
    pathname.startsWith("/findemail")||
    pathname.startsWith("/findpassword")||
    pathname.startsWith("/user/profile");
    pathname.startsWith("/user/qrcode");

  return (
    <Container>
      <Page $hasNavBar={!isHiddenNavBar}>
        {children}
        {!isHiddenNavBar && <NavBar />}
      </Page>
    </Container>
  );
};

export default LayoutContainer;
