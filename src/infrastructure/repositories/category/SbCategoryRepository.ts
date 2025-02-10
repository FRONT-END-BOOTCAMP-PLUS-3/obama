import supabase from "@/infrastructure/databases/supabase/server";
import { ICategoryRepository } from "@/domain/repositories/category/ICategoryRepository";
import { Category } from "@/domain/entities/category/Category";

export class SbCategoryRepository implements ICategoryRepository {
  async getCategories(): Promise<Category[]> {
    const client = await supabase();

    const { data, error } = await client.from("category").select("*");

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data as Category[];
  }
}
