import supabase from "@/infrastructure/databases/supabase/server";
import { GetCategoryListDto } from "./dto/GetCategoryListDto";

export class GetCategoryListUseCase {
  async execute(requestDto: GetCategoryListDto): Promise<GetCategoryListDto> {
    const client = await supabase();

    const startIndex = requestDto.startIndex ?? 0; // 기본값 설정
    const limit = requestDto.limit ?? null; // limit이 없으면 null로 설정

    let query = client.from("category").select("*"); // 기본 쿼리 설정

    if (limit !== null) {
      query = query.range(startIndex, startIndex + limit - 1); // limit이 있을 경우 범위 설정
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return { categories: data }; // 카테고리 반환
  }
}
