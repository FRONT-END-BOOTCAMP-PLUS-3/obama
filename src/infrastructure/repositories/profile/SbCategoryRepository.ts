import { ICategoryRepository } from "@/domain/repositories/profile/ICategoryRepository";
import { Category } from "@/domain/entities/profile/Category";
import supabase from "@/infrastructure/databases/supabase/server";

// 카테고리 정보 조회
export class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<Category[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("category")
      .select("category_id, category_name");

    if (error) throw new Error("Categories not found");
    return data!;
  }
}
