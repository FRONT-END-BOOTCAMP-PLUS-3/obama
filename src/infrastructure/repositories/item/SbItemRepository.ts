import supabase from "@/infrastructure/databases/supabase/server";
import { IItemRepository } from "@/domain/repositories/item/IItemRepository";
import { Item } from "@/domain/entities/item/Item";

export class SbItemRepository implements IItemRepository {
  async getItems(categoryId?: number): Promise<Item[]> {
    const client = await supabase();

    let query = client.from("item").select("*");

    if (categoryId !== undefined) {
      query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch items: ${error.message}`);
    }

    console.log(`📌 Filtered Data for categoryId ${categoryId}:`, data);

    return data;
  }
}
