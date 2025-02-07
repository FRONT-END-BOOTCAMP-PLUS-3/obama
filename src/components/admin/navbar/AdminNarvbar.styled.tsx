import styled from "styled-components";

export const Sidebar = styled.div`
  width: 15rem;
  height: 100%;
  background-color: var(--primary-50);
  display: flex;
  flex-direction: column;
  position: fixed; 
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.625rem 20px;
`;

export const Logo = styled.img`
  width: 3.75rem;
  height: 3.75rem;
`;

export const LogoText = styled.h2`
  margin-left: 1rem;
  color: var(--primary-color);
  margin-top: 1.25rem;
`;

export const NavList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.div<{ $isOpen?: boolean }>`
  width: 100%;
  height: 70px;
  border-top: 1px solid var(--gray-500);
  border-bottom: 1px solid var(--gray-500);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
  background-color: ${({ $isOpen }) => ($isOpen ? 'var(--primary-400)' : 'transparent')};
  color: ${({ $isOpen }) => ($isOpen ? 'var(--black-color)' : 'inherit')};

  &:hover {
    background-color: var(--active-color);
    color: var(--white-color);
  }
`;

export const ArrowIcon = styled.img<{ $isOpen?: boolean; $isSelected?: boolean }>`
  margin-left: auto;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const Submenu = styled.div`
  background-color: var(--primary-100);
`;

export const SubmenuItem = styled.div<{ $isActive?: boolean }>`
  width: 100%;
  height: 70px;
  border-top: 1px solid var(--gray-500);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? 'var(--active-color)' : 'var(--primary-100)')};
  color: ${({ $isActive }) => ($isActive ? 'var(--white-color)' : 'inherit')};

  &:hover {
    background-color: var(--active-color);
    color: var(--white-color);
  }
`;

