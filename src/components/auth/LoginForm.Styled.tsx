import styled, { keyframes } from "styled-components";

const rubberBand = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
`;

export const LoginWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 100%;
  gap:5rem;
`;

export const Title = styled.h2`
  display: flex;
`;

export const InputLayer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
`;

export const SectionButtonLayer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const TextButton= styled.button`
    position: relative;
    display: inline-flex;
    text-align: center;
    animation-duration: 1s;
    animation-fill-mode: both;
    padding: 0;
    border: none;
    background: transparent;
    transition: all 0.3s ease;
    color: inherit;
    cursor: pointer;

    & > * {
    display: block;
    transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    content: attr(data-hover);
    display: inline;
    text-align: center;
    
  }

  /* hover 시 버튼 전체 텍스트 색상 변경 */
  &:hover {
    color: var(--primary-color);
    animation-name: ${rubberBand};
    transition: top 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  /* hover 시 자식 요소(원래 span 역할)의 효과 적용 */
  &:hover > * {
    color: var(--primary-color);
    transform: translateY(-100%);
  }

  /* hover 시 ::after 가 위로 올라오는 효과 */
  &:hover::after {
    top: 0;
  }

  &:active {
    animation: ${rubberBand} 1s;
  }
`;

export const TextButtonLayer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1.25rem;
    margin-top: 4rem;

`;
