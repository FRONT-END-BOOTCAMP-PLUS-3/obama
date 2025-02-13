"use client"
import {
  FindEmailWrapper,
  InputLayer,
  SectionButtonLayer,
  Title,
} from "@/components/findemail/FindEmail.Styled";
import { TextField } from "@/components/common/textField";
import { Button } from "@/components/common/button";
import { useFindEmailForm } from "@/components/findemail/useFindEmailForm";
import FindEmailResult from "./FindEmailResult";


const FindEmail = () => {
  const {
    formState,
    isLoading,
    message,
    isChange,
    handleFormChange,
    handleSubmit,
    handleClickBack,
  } = useFindEmailForm();

  const {name, phone} = formState;
  // const email:string ="seogu080@naver.com";

  return (
    <>
      <FindEmailWrapper>
        <Title>이메일 찾기</Title>
        {isChange ? <FindEmailResult email={message} />:(
          <>
         <InputLayer>
          <TextField
            name="name"
            placeholder="name"
            type="text"
            size="L"
            required={true}
            autoFocus={true}
            value={name}
            onChange={handleFormChange}
          />

          <TextField
            name="phone"
            placeholder="phone"
            type="text"
            size="L"
            maxLength={11}
            required={true}
            value={phone}
            onChange={handleFormChange}
          />
        </InputLayer> 
   
        <SectionButtonLayer>
          <Button
            size="m"
            variant="line"
            type="button"
            onClick={handleClickBack}
            disabled={isLoading}
          >
            이 전
          </Button>
          <Button
            size="m"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            이메일 찾기
          </Button>
        </SectionButtonLayer>
        </>
           )}  
      </FindEmailWrapper>
    </>
  );
};
export default FindEmail;
