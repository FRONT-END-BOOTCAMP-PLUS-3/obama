"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetItemListUseCase } from "@/application/usecases/item/GetItemListUseCase";
import { GetItemListDto } from "@/application/usecases/item/dto/GetItemListDto";
import { GetCharacterListUseCase } from "@/application/usecases/character/GetCharacterListUseCase";
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
  const characterId = Number(id);
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
    const fetchCharacters = async () => {
      try {
        const useCase = new GetCharacterListUseCase();
        const response = await useCase.execute({ startIndex: 0, limit: 12 });

        const character = response.characters.find(
          (character: { character_id: number }) =>
            character.character_id === characterId
        );

        if (character) {
          setQuestion(character.character_question);
        } else {
          setQuestion("No Question available");
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [characterId]);

  useEffect(() => {
    if (isNaN(characterId) || characterId === 4) return;

    const fetchItems = async () => {
      try {
        const useCase = new GetItemListUseCase();
        const response = await useCase.execute({ startIndex: 0 });
        const filteredItems = response.items.filter(
          (item) => item.character_id === characterId
        );
        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [characterId]);

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
    }

    const newCharacterId =
      direction === "next" ? characterId + 1 : characterId - 1;
    router.push(`/${newCharacterId}/create`);
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

  return (
    <ProfileCreateContainer>
      <ProfileSection>
        <ProfileTitle>나를 소개하는 프로필 생성하기</ProfileTitle>
      </ProfileSection>

      <QuestionSection>
        <h5>
          Q{characterId}. {question}
        </h5>
      </QuestionSection>
      <BottomSection>
        {characterId === 4 ? (
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
        ) : characterId === 11 ? (
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
        ) : characterId === 12 ? (
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
          <Button
            size="m"
            variant="line"
            onClick={() => handleNavigation("previous")}
          >
            이전
          </Button>
          <Button
            size="m"
            variant="contained"
            onClick={() => handleNavigation("next")}
          >
            다음
          </Button>
        </BottomButtonContainer>
      </BottomSection>
    </ProfileCreateContainer>
  );
}
