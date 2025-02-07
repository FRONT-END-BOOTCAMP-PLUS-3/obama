import { IItemRepository } from "@/domain/repositories/item/IItemRepository";
import { Item } from "@/domain/entities/item/Item";

export class GetItemListUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(categoryId?: number): Promise<Item[]> {
    return this.itemRepository.getItems(categoryId); // ✅ categoryId 전달
  }
}
