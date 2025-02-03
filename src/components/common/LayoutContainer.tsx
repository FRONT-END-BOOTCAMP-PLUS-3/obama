import styled from "styled-components";
import NavBar from "./Navbar/Navbar";
import { usePathname } from "next/navigation";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--gray-500);
`;

const Page = styled.div<{ $hasNavBar: boolean }>`
  position: relative;
  width: 390px;
  height: ${({ $hasNavBar }) => ($hasNavBar ? "100vh" : "100%")};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $hasNavBar }) =>
    $hasNavBar ? "space-between" : "center"};
  align-items: center;
  overflow: hidden;
  padding-bottom: 5rem;
  background-color: var(--white-color);
`;

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHiddenNavBar =
    pathname === "/" ||
    pathname.startsWith("/admin") ||
    pathname.endsWith("/create");

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
