import styled from "styled-components";
import NavBar from "./Navbar/Navbar";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Page = styled.div<{ hasNavBar: boolean }>`
  position: relative;
  width: 390px;
  height: ${({ hasNavBar }) => (hasNavBar ? "100vh" : "100%")};
  text-align: center;
  border: solid 1px #000000; /* TODO : UI 구현 후 삭제 */
  display: flex;
  flex-direction: column;
  justify-content: ${({ hasNavBar }) => (hasNavBar ? "space-between" : "center")};
  align-items: center;
`;

const LayoutContainer = ({
  children,
  hasNavBar,
}: {
  children: React.ReactNode;
  hasNavBar: boolean;
}) => (
  <Container>
    <Page hasNavBar={hasNavBar}>
      {children}
      {hasNavBar && <NavBar />}
    </Page>
  </Container>
);

export default LayoutContainer;
