"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LayoutContainer from "@/components/common/LayoutContainer";
import Dropdown from "@/components/common/dropdown/Dropdown";
import { Title, SuggestExplain, Question, ButtonWrapper } from "@/components/smaltalk/Select.Styled";
import  Button  from "@/components/common/button/Button";
import apiClient from "@/utils/api/apiClient";
import { SmalltalkSubjectDto } from "@/application/usecases/smalltalk/dto/SmalltalkSubjectDto";

export default function SmalltalkSelect() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<SmalltalkSubjectDto[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchSubjects = async () => {
    try {
      const res = await apiClient.get("/api/smalltalks/select");
      
      if (res.data.subject.length > 0) {
        setSubjects(res.data.subject); 
      }
    } catch (err) {
      console.error(" Failed to fetch subjects:", err);
    }
  };
  
  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (subjects.length > 0 && !selectedSubject) {
      setSelectedSubject(subjects[0].subjectName);
    }
  }, [subjects]);
  
  const handleNavigate = () => {
    const selectedSubjectId = subjects.find((s) => s.subjectName === selectedSubject)?.subjectId;

    if (selectedSubjectId) {
      router.push(`/smalltalks/${selectedSubjectId}`);
    }
  };
 

  const handleDropdownToggle = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };


  return (
    <LayoutContainer>
      <Title>대화주제 추천받기</Title>
      <SuggestExplain>
        원하시는 주제를 골라주세요. <br />
        선택하신 내용을 바탕으로 <br />
        대화 주제를 추천해드리겠습니다.
      </SuggestExplain>
      <Question>어떤 큰 주제로 대화하고 싶으신가요?</Question>

      <Dropdown
        options={subjects} 
        onSelect={(selected) => setSelectedSubject(selected)} 
        selected={selectedSubject}
        onToggle={handleDropdownToggle} />

      <ButtonWrapper $isHidden={isDropdownOpen}>
        <Button size="m" variant="contained" onClick={handleNavigate}>
          대화주제<br/> 추천받기
        </Button>
      </ButtonWrapper>
    </LayoutContainer>
  );
}