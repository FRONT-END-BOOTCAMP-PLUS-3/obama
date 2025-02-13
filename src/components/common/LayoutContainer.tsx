"use client";

import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: var(--gray-500);
  position: relative;
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

const SidebarToggle = styled.button`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
`;

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() ?? "";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isHiddenNavBar =
    pathname === "/" ||
    pathname.startsWith("/user/admin") ||
    pathname.startsWith("/user/items") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signUp") ||
    pathname.startsWith("/user/withdraw") ||
    pathname.startsWith("/user/withdraw/confirm") ||
    pathname.startsWith("/findemail") ||
    pathname.startsWith("/findpassword") 

    return (
      <Container>
        <Page $hasNavBar={!isHiddenNavBar} >
          {!isHiddenNavBar && (
            <>
              <SidebarToggle onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Image src="/Icons/sidebarButton.svg" alt="Menu" width="30" height="30" />
              </SidebarToggle>
              <Sidebar $isOpen={isSidebarOpen} $setIsOpen={setIsSidebarOpen} />
            </>
          )}
          {children}
        </Page>
      </Container>
    );    
};

export default LayoutContainer;
