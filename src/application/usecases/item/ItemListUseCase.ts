import { IItemRepository } from "@/domain/repositories/item/IItemRepository";
import { Item } from "@/domain/entities/item/Item";
import { GetItemListDto } from "./dto/ItemListDto";

export class GetItemListUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(dto: GetItemListDto): Promise<Item[]> {
    return this.itemRepository.getItems(dto.categoryId); // ✅ DTO 사용
  }
}
