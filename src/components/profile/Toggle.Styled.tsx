import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 4.6rem;
  height: 2rem;
`;

export const CheckBox = styled.input<{ ischecked: boolean }>`
  appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.ischecked ? "var(--primary-color)" : "var(--disabled-color)")};
  border-radius: 3rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: ${(props) => (props.ischecked ? "calc(100% - 26px)" : "6px")};
    width: 1.2rem;
    height: 1.2rem;
    background: white;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: left 0.3s ease-in-out;
  }
`;

export const Text = styled.span<{ position: "left" | "right"; ischecked: boolean }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.position === "left" ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  font-size: 0.7rem;
  color: var(--black-color);
  transition: color 0.2s ease-in-out, display 0.2s ease-in-out;

  display: ${(props) =>
    props.position === "left" && !props.ischecked
      ? "none"
      : props.position === "right" && props.ischecked
      ? "none"
      : "block"};
`;
