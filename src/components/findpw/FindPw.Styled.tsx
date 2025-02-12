import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 3.75rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%; 
  justify-content: center;
  margin-bottom: 3.75rem;
`;
export const ChangePWButtonContainer = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 1rem;
  width: 100%; 
  justify-content: center;
  align-items: center;
  margin-bottom: 3.75rem;
  margin-top: 7.5rem;
`;

export const ErrorMessage = styled.span`
  color: var(--error-color); 
  font-size: var(--font-size-sm); 
  margin: -1.25rem 0;`
;

export const SuccessMessage = styled.span`
  color: var(--success-color); 
  font-size: var(--font-size-sm); 
  margin: -1.25rem 0;
  `
;