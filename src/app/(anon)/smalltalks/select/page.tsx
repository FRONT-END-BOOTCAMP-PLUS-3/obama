"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LayoutContainer from "@/components/common/LayoutContainer";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { SmalltalkSubject } from "@/domain/entities/SmalltalkSubject";
import { Title, SuggestExplain, Question, ButtonWrapper } from "@/app/(anon)/smalltalks/select/select.Styled";
import { Button } from "@/components/common/Button";

export default function SmalltalkSelect() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<SmalltalkSubject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get("/api/smalltalkSubjects");
      const subjectData = res.data.data;

      if (subjectData.length > 0) {
        setSubjects(subjectData);
        setSelectedSubject(subjectData[0].subject_name); 
      }
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSelect = (selectedName: string) => {
    setSelectedSubject(selectedName); 
  };

  const handleNavigate = () => {
    const selectedSubjectId = subjects.find((s) => s.subject_name === selectedSubject)?.subject_id;

    if (selectedSubjectId) {
      router.push(`/smalltalks/${selectedSubjectId}`);
    }
  };

  const subjectNames = subjects.map((s) => s.subject_name);

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

      <Dropdown options={subjectNames} onSelect={handleSelect} selected={selectedSubject} onToggle={handleDropdownToggle} />

      <ButtonWrapper $isHidden={isDropdownOpen}>
        <Button size="m" variant="contained" onClick={handleNavigate}>
          대화주제<br/> 추천받기
        </Button>
      </ButtonWrapper>
    </LayoutContainer>
  );
}
