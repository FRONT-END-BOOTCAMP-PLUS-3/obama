"use client";

import { Question, SuggestExplain, Title } from "@/app/(anon)/smalltalks/select/select.Styled";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import LayoutContainer from "@/components/common/LayoutContainer";

const smalltalkselect = ()=>{

  const handleSelect = (option: string) => {
    console.log("선택된 옵션:", option); 
  };
  return(
    <LayoutContainer>
      <Title>대화주제 추천받기</Title>
      <SuggestExplain>
        원하시는 주제를 골라주세요. <br/>
        선택하신 내용을 바탕으로 <br/>
        대화 주제를 추천해드리겠습니다.
      </SuggestExplain>
      <Question>어떤 큰 주제로 대화하고 싶으신가요?</Question>
      {/* db연결 후 options 변경 예정입니다 */}
      <Dropdown options={["Option 1", "Option 2", "Option 3","Option 4","Option 5","Option 6","Option 7"]} onSelect={handleSelect} />
    </LayoutContainer>
  )
};


export default smalltalkselect;