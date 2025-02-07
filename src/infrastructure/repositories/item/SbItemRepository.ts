import supabase from "@/infrastructure/databases/supabase/server";
import { IItemRepository } from "@/domain/repositories/item/IItemRepository";
import { Item } from "@/domain/entities/item/Item";

export class SbItemRepository implements IItemRepository {
  async getItems(categoryId?: number): Promise<Item[]> {
    const client = await supabase();

    let query = client.from("item").select("*");

    // ✅ categoryId가 올바른 숫자일 경우만 필터 적용
    if (typeof categoryId === "number" && !isNaN(categoryId)) {
      query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch items: ${error.message}`);
    }

    console.log(`📌 Filtered Data for categoryId ${categoryId}:`, data); // ✅ 디버깅 로그 추가

    return data;
  }
}
