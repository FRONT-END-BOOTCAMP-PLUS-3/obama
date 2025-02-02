"use client";

import { useEffect, useState } from "react";
import { GetItemListUseCase } from "@/application/usecases/item/GetItemListUseCase";
import { GetItemListDto } from "@/application/usecases/item/dto/GetItemListDto";
import { Button } from "@/components/common/Button";
import {
  Container,
  ButtonList,
  ProfileTitle,
  BottomButtonContainer,
  ProfileSection,
} from "./page.Styled";

export default function CreatePage() {
  const [items, setItems] = useState<GetItemListDto["items"]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const useCase = new GetItemListUseCase();
        const response = await useCase.execute({ offset: 0 });
        console.log("Fetched Items:", response.items);

        const filteredItems = response.items.filter(
          (item) => item.category_id === 1
        );

        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Container>
      {/* 프로필 생성 섹션 */}
      <ProfileSection>
        <ProfileTitle>나를 소개하는 프로필 생성하기</ProfileTitle>
      </ProfileSection>
      <h5>Q3. 나의 취미는?</h5>

      {items.length > 0 ? (
        <ButtonList>
          {items.map((item, index) => (
            <Button key={index} size="s" variant="contained" isToggle={true}>
              {item.item_name || "No name available"}
            </Button>
          ))}
        </ButtonList>
      ) : (
        <p>No items found</p>
      )}

      <BottomButtonContainer>
        <Button size="m" variant="line">
          건너뛰기
        </Button>
        <Button size="m" variant="contained">
          다음
        </Button>
      </BottomButtonContainer>
    </Container>
  );
}
