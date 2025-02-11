import { IProfileRepository } from "@/domain/repositories/IProfileRepository";
import { AboutMeDTO } from "@/application/profile/dtos/AboutMeDTO";
import { ProfileDetailsDTO } from "@/application/profile/dtos/ProfileDetailsDTO";
import { createClient } from "@/infrastructure/databases/supabase/server";

export class GetAboutMeUsecase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(userId: string): Promise<AboutMeDTO> {
    const supabase = createClient();

    // ✅ userInput 테이블에서 모든 category_id에 해당하는 응답 가져오기
    const { data: userInputs, error: userInputError } = await supabase
      .from("userInput")
      .select("category_id, answer")
      .eq("user_id", userId);

    if (userInputError) throw new Error(userInputError.message);
    
    // ✅ category 테이블에서 모든 카테고리 조회
    const { data: categories, error: categoryError } = await supabase
      .from("category")
      .select("category_id, category_name");

    if (categoryError) throw new Error(categoryError.message);

    // ✅ category_id를 기반으로 사용자 입력값 매핑
    const aboutMeData = categories
      .map((category) => {
        const userAnswer = userInputs.find((input) => input.category_id === category.category_id);
        return userAnswer ? {
          label: category.category_name,
          value: `#${userAnswer.answer.split(", ").join(" #")}`,
        } : null;
      })
      .filter((item) => item !== null); // "정보 없음" 데이터 제거

    return aboutMeData as AboutMeDTO;
  }
}


