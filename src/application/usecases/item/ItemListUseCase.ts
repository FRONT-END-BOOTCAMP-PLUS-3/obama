import { IItemRepository } from "@/domain/repositories/item/IItemRepository";
import { Item } from "@/domain/entities/item/Item";
import { ItemListDto } from "./dto/ItemListDto";

export class ItemListUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(dto: ItemListDto): Promise<Item[]> {
    if (
      dto.categoryId !== undefined &&
      (typeof dto.categoryId !== "number" || isNaN(dto.categoryId))
    ) {
      throw new Error("Invalid categoryId: must be a valid number");
    }

    return this.itemRepository.getItems(dto.categoryId);
  }
}
