import { createClient } from "@/utils/supabase/server";
import { GetItemListDto } from "./dto/GetItemListDto";

export class GetItemListUseCase {
  async execute(requestDto: GetItemListDto): Promise<GetItemListDto> {
    const supabase = await createClient();

    const offset = requestDto.offset ?? 0; // 기본값 설정
    const limit = requestDto.limit ?? 10;

    const { data, error } = await supabase
      .from("item")
      .select("*") // 정렬 제거
      .range(offset, offset + limit - 1); // 범위 설정

    if (error) {
      throw new Error(`Failed to fetch items: ${error.message}`);
    }

    return { items: data }; // 아이템 반환
  }
}
