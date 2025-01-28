"use client";

import { NavBarContainer, NavItemLink, NavIcon } from "./NavBar.Styeld";
import { NavItem } from "@/types/NavBar";
import Image from "next/image";

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
          <NavIcon>
            <Image
              src={`/Icons/${item.label}.svg`}
              alt={`${item.label} 아이콘`}
              layout="fill"
              objectFit="contain"
            />
          </NavIcon>
        </NavItemLink>
      ))}
    </NavBarContainer>
  );
};

export default NavBar;
