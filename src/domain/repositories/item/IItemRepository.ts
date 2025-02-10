import { Item } from "@/domain/entities/item/Item";

export interface IItemRepository {
  getItems(categoryId?: number): Promise<Item[]>;
}
