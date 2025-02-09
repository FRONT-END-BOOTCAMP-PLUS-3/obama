
import styled, { keyframes } from "styled-components";

// rubberBand 애니메이션 정의
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

// 스타일 정의
const TextButtonStyled = styled.button`
  display: inline-block;
  align-self: start;
  outline: none;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  color: ${(props) => props.color || "inherit"}; /* 기본 색상 */
  transition: color 0.3s ease;

  /* 기본 텍스트 */
  & > span {
    display: block;
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  /* hover 상태 */
  &:hover {
    animation: ${rubberBand} 1s;
    color: ${(props) => props.color || "var(--primary-color)"};
  }

  /* 기본 텍스트 이동 효과 */
  &:hover > span {
    transform: translateY(-100%);
  }

  /* hover 시 ::after 효과 */
  &::after {
    content: attr(data-hover);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    color: ${(props) => props.color || "var(--primary-color)"};
    font-weight: bold;
    text-align: center;
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &:hover::after {
    transform: translateY(0);
  }

  &:active {
    animation: ${rubberBand} 1s;
  }


`;
export default TextButtonStyled