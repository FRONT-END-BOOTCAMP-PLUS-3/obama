import { IItemRepository } from "@/domain/repositories/item/IItemRepository";
import { Item } from "@/domain/entities/item/Item";
import { ItemListDto } from "./dto/ItemListDto";

export class ItemListUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(dto: ItemListDto): Promise<Item[]> {
    return this.itemRepository.getItems(dto.categoryId); // ✅ DTO 사용
  }
}
