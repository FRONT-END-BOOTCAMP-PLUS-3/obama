import { GetItemListUseCase } from "@/application/usecases/item/GetItemListUseCase";
import { GetItemListDto } from "@/application/usecases/item/dto/GetItemListDto";

export const fetchItemsByCategory = async (
  categoryId: number
): Promise<GetItemListDto["items"]> => {
  if (isNaN(categoryId) || categoryId === 4) return [];

  try {
    const useCase = new GetItemListUseCase();
    const response = await useCase.execute({ offset: 0 });

    return response.items.filter((item) => item.category_id === categoryId);
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};
