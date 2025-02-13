"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? "80%" : "0")};
  height: 100%;
  background-color: var(--hover-color);
  color: white;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute; 
  top: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
  padding-top: 3.75rem; 
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  margin-top: 3.125rem;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  font-size: var( --font-size-base);

  &:hover {
    background-color: var(--active-color); 
  }
`;

const Text = styled.span<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "inline" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

interface SidebarProps {
  $isOpen: boolean;
  $setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ $isOpen, $setIsOpen }) => {
  const router = useRouter(); 
  const handleNavigation = (path: string) => {
    router.push(path); 
    $setIsOpen(false); 
  };

  return (
    <SidebarContainer $isOpen={$isOpen}>
      <MenuList>
        <MenuItem onClick={() => handleNavigation("/user/profile")}>
          <Text $isOpen={$isOpen}>Profile</Text>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/user/qrcode")}>
          <Text $isOpen={$isOpen}>QR code</Text>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/user/dashboard")}>
          <Text $isOpen={$isOpen}>MyPage</Text>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/smalltalks/select")}>
          <Text $isOpen={$isOpen}>Smalltalk</Text>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/user/items?cn=hobby")}>
          <Text $isOpen={$isOpen}>Profile Create</Text>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/user/profile/edit")}>
          <Text $isOpen={$isOpen}>Profile Edit</Text>
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
