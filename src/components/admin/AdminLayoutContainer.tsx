"use client";

import styled from "styled-components";

const Container = styled.div`
  display: block; 
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: var(--white-color);
`;

const AdminLayoutContainer = ({ children }: { children: React.ReactNode }) =>  (
  <Container>
    {children}
  </Container>
);

export default AdminLayoutContainer;