import styled from "styled-components";
import Link from "next/link";

export const NavBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  z-index: 1000;
`;

export const NavItemLink = styled(Link)`
  text-decoration: none;
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  text-align: center;
  transition: color 0.2s;

  &:hover {
    color: var(--hover-color);
  }
`;

export const NavIcon = styled.div`
  font-size: 3.4375rem;
  margin-bottom: 0.25rem;
`;

export const NavLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--gray-700);
`;
