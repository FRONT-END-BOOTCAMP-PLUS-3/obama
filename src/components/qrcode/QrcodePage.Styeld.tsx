"use client";

import styled from "styled-components";

export const QrcodeCreateContainer = styled.div`
  margin-top: 5rem;
  padding: 2rem; /* 32px -> 2rem */
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;
`;

export const QrTitle = styled.h4`
  text-align: center;
  color: var(--primary-color);
`;

export const QrTitleSection = styled.div`
  display: flex;
  justify-content: center;
`;

export const QrcodeSection = styled.div`
  display: flex;
  justify-content: center;
`;
