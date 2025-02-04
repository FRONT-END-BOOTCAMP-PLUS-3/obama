import styled from "styled-components";
import Link from "next/link";

export const NavBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 390px;
  height: 80px;
  background-color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 50;
  border-top: solid 1px var(--gray-100);
`;

export const NavItemLink = styled(Link)`
  text-decoration: none;
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  text-align: center;
`;

export const NavIcon = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
  margin-bottom: 0.25rem;
`;