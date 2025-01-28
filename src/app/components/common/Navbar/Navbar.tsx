"use client";

import {
  NavBarContainer,
  NavItemLink,
  NavIcon,
  NavLabel,
} from "./NavBar.Styeld";
import { NavItem } from "@/types/NavBar";

const navItems: NavItem[] = [
  { label: "profile", href: "/" },
  { label: "qrcode", href: "/qrcode" },
  { label: "smalltalk", href: "/smalltalk" },
];

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      {navItems.map((item) => (
        <NavItemLink key={item.href} href={item.href}>
          <NavIcon>아이콘</NavIcon>
          <NavLabel>{item.label}</NavLabel>
        </NavItemLink>
      ))}
    </NavBarContainer>
  );
};

export default NavBar;
