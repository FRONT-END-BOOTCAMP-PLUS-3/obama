"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchItemsByCategory } from "@/infrastructure/adapters/ItemAdapter";
import { fetchCategoryQuestion } from "@/infrastructure/adapters/CategoryAdapter";
import { Button } from "@/components/common/Button";
import {
  ProfileCreateContainer,
  ButtonList,
  ProfileTitle,
  BottomButtonContainer,
  ProfileSection,
  MBTIButtonList,
  TextFieldSection,
  QuestionSection,
  BottomSection,
} from "./page.Styled";
import MBTISelectButton from "./components/mbtibutton";
import { TextField } from "@/components/common/TextField";
import IntroduceInput from "./components/introduceInput";
import ProfileImageUploader from "./components/profileUploader";

export default function CreatePage() {
  const { id } = useParams();
  const categoryId = Number(id);
  const router = useRouter();

  const [items, setItems] = useState<GetItemListDto["items"]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [question, setQuestion] = useState<string>("");
  const [introText, setIntroText] = useState<string>("");

  const [textFieldValue, setTextFieldValue] = useState<string>("");

  const mbtiOptions = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ];

  useEffect(() => {
    const getQuestion = async () => {
      const question = await fetchCategoryQuestion(categoryId);
      setQuestion(question);
    };
    getQuestion();
  }, [categoryId]);

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchItemsByCategory(categoryId);
      setItems(items);
    };
    getItems();
  }, [categoryId]);

  const handleNavigation = (direction: "next" | "previous") => {
    if (direction === "next") {
      // if (selectedItems.size > 0) {
      //   console.log("선택된 아이템:", Array.from(selectedItems)); // 아이템 리스트 출력
      // } else if (textFieldValue) {
      //   console.log("TextField 입력값:", textFieldValue); // 텍스트필드 입력값 출력
      // } else if (introText) {
      //   console.log("소개 입력 값:", introText); // IntroduceInput 값 출력
      // } else if (selectedType) {
      //   console.log("선택한 MBTI:", selectedType); // MBTI 출력
      // }
      // API 연결하기
    }

    const newCategoryId =
      direction === "next" ? categoryId + 1 : categoryId - 1;
    router.push(`/${newCategoryId}/create`);
  };

  const handleToggle = (itemName: string) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemName)) {
        newSelectedItems.delete(itemName);
      } else {
        newSelectedItems.add(itemName);
      }
      return newSelectedItems;
    });
  };

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const toggleSelection = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type)); // 선택된 MBTI만 토글
  };

  const PreviousButton = ({ onClick }: { onClick: () => void }) => (
    <Button size="m" variant="line" onClick={onClick}>
      이전
    </Button>
  );

  const NextButton = ({ onClick }: { onClick: () => void }) => (
    <Button size="m" variant="contained" onClick={onClick}>
      다음
    </Button>
  );

  return (
    <ProfileCreateContainer>
      <ProfileSection>
        <ProfileTitle>나를 소개하는 프로필 생성하기</ProfileTitle>
      </ProfileSection>

      <QuestionSection>
        <h5>
          Q{categoryId}. {question}
        </h5>
      </QuestionSection>
      <BottomSection>
        {categoryId === 4 ? (
          <MBTIButtonList>
            {mbtiOptions.map((mbti, index) => (
              <MBTISelectButton
                key={index}
                label={mbti}
                selected={selectedType === mbti}
                onClick={() => toggleSelection(mbti)}
              />
            ))}
          </MBTIButtonList>
        ) : categoryId === 11 ? (
          <IntroduceInput value={introText} onChange={setIntroText} />
        ) : items.length > 0 ? (
          <ButtonList>
            {items.map((item, index) => (
              <Button
                key={index}
                size="s"
                variant={
                  selectedItems.has(item.item_name || "") ? "contained" : "line"
                }
                onClick={() => handleToggle(item.item_name || "")}
              >
                {item.item_name || "No name available"}
              </Button>
            ))}
          </ButtonList>
        ) : categoryId === 12 ? (
          <ProfileImageUploader></ProfileImageUploader>
        ) : (
          <TextFieldSection>
            <TextField
              size="L"
              name="textfield"
              placeholder="질문에 대한 답변을 해주세요."
              value={textFieldValue}
              onChange={(name, value) => setTextFieldValue(value)}
            />
          </TextFieldSection>
        )}

        <BottomButtonContainer>
          <PreviousButton onClick={() => handleNavigation("previous")} />
          <NextButton onClick={() => handleNavigation("next")} />
        </BottomButtonContainer>
      </BottomSection>
    </ProfileCreateContainer>
  );
}
