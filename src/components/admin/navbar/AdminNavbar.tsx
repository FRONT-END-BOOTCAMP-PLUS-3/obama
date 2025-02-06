import { useState } from "react";
import { adminNavbarItems } from "@/data/adminNavbar";
import AdminNavbarItem from "@/components/admin/navbar/AdminNavbarItem";
import Link from "next/link";
import {
  Sidebar,
  LogoContainer,
  Logo,
  LogoText,
  NavList,
  NavItem,
  Submenu,
  SubmenuItem,
  ArrowIcon,
} from "@/components/admin/navbar/AdminNarvbar.styled";

const AdminNavbar = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null);
  const [selectedSubmenuItem, setSelectedSubmenuItem] = useState<string | null>(null);

  const handleToggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleNavItemClick = (label: string) => {
    setSelectedNavItem(label);
  };

  const handleSubmenuItemClick = (label: string) => {
    setSelectedSubmenuItem(label);
  };

  const renderNavItem = (item: { label: string; path?: string; children?: any }) => {
    const isOpen = openDropdowns[item.label] || selectedNavItem === item.label;

    return (
      <li key={item.label}>
        {item.children ? (
          <>
            <NavItem onClick={() => handleToggleDropdown(item.label)} $isOpen={isOpen}>
              {item.label}
              <ArrowIcon src="/icons/NavbarArrowDown.svg" alt="Arrow Down" $isOpen={isOpen} />
            </NavItem>
            {isOpen && (
              <Submenu>
                {item.children.map((child: any) => (
                  <SubmenuItem
                    key={child.label}
                    onClick={() => handleSubmenuItemClick(child.label)}
                    $isActive={selectedSubmenuItem === child.label}
                  >
                    <AdminNavbarItem item={child} />
                  </SubmenuItem>
                ))}
              </Submenu>
            )}
          </>
        ) : (
          <Link href={item.path || "#"}>
            <NavItem onClick={() => handleNavItemClick(item.label)}>{item.label}</NavItem>
          </Link>
        )}
      </li>
    );
  };

  return (
    <Sidebar>
      <LogoContainer>
        <Logo src="/Images/logo.svg" alt="Logo" />
        <LogoText>소톡소톡</LogoText>
      </LogoContainer>
      <NavList>{adminNavbarItems.map(renderNavItem)}</NavList>
    </Sidebar>
  );
};

export default AdminNavbar;
