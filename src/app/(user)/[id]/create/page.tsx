"use client";

import { useEffect, useState } from "react";
import { GetItemListUseCase } from "@/application/usecases/item/GetItemListUseCase";
import { GetItemListDto } from "@/application/usecases/item/dto/GetItemListDto";
import { Button } from "@/components/common/Button";

export default function CreatePage() {
  const [items, setItems] = useState<GetItemListDto["items"]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const useCase = new GetItemListUseCase();
        const response = await useCase.execute({ offset: 0 }); // limit 제거, offset만 전달
        console.log("Fetched Items:", response.items);

        // category_id가 1인 아이템만 필터링
        const filteredItems = response.items.filter(
          (item) => item.category_id === 1
        );

        setItems(filteredItems); // 필터링된 아이템을 상태로 설정
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h5>Q3. 나의 취미는?</h5>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Button key={index} size="m" variant="contained" isToggle={true}>
            {item.item_name || "No name available"}
          </Button>
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
}
