"use client"
import {
  FindIDWrapper,
  InputLayer,
  SectionButtonLayer,
  Title,
} from "@/components/findid/FindID.Styled";
import { TextField } from "@/components/common/textField";
import { Button } from "@/components/common/button";
import { useFindIDForm } from "@/components/findid/useFindIDForm";

const FindID = () => {
  const {
    formState,
    isLoading,

    handleFormChange,
    handleSubmit,
    handleClickBack,
  } = useFindIDForm();

  const {name, phone} = formState;

  return (
    <>
      <FindIDWrapper>
        <Title>이메일 찾기</Title>
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
      </FindIDWrapper>
    </>
  );
};
export default FindID;
