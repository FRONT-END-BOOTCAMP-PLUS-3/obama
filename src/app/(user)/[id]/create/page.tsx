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
        const response = await useCase.execute({ offset: 0, limit: 10 });
        console.log("Fetched Items:", response.items);
        setItems(response.items || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Create Page</h1>
      <ul>
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>
              {item.item_name ? item.item_name : "No name available"}{" "}
              {/* item_name이 없으면 기본값 표시 */}
            </li>
          ))
        ) : (
          <li>No items found</li> // 아이템이 없을 경우 메시지 표시
        )}
      </ul>
      <Button size="m" variant="contained" isToggle={true}>
        토글 버튼
      </Button>
      <Button size="m" variant="line" isToggle={true}>
        토글 버튼
      </Button>
    </div>
  );
}
