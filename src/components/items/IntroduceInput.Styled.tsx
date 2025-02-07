import styled from "styled-components";

export const TextInputContainer = styled.div`
  width: 20.125rem;
  padding: 1.25rem;
  border-radius: 3.125rem;
  text-align: center;
  border: 0.0625rem solid var(--gray-700);
  position: relative;
  min-height: 8.3125rem;
  display: flex;
  flex-direction: column;
`;

export const TextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Textarea = styled.textarea`
  width: 100%;
  border: none;
  font-size: 1rem;
  min-height: 7.5rem;
  max-height: 15rem; /* 최대 높이 설정 */
  padding: 0.625rem;
  box-sizing: border-box;
  overflow-y: auto; /* 내부 스크롤 활성화 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE에서 스크롤바 숨기기 */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari에서 스크롤바 숨기기 */
  }

  &:focus + div {
    display: none;
  }
`;

export const StyledPlaceholder = styled.div`
  position: absolute;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  font-size: 0.875rem;
  color: var(--gray-400);
  text-align: center;
  pointer-events: none;
  font-weight: bold;
  line-height: 1.5;
`;
