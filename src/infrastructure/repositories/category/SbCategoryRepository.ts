import supabase from "@/infrastructure/databases/supabase/server";
import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository";
import { Category } from "@/domain/entities/Category";

export class SbCategoryRepository implements ICategoryRepository {
  async getCategories(
    startIndex = 0,
    limit: number | null = null
  ): Promise<Category[]> {
    const client = await supabase();

    let query = client.from("category").select("*");

    if (limit !== null) {
      query = query.range(startIndex, startIndex + limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data as Category[];
  }
}
