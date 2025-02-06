import { IProfileRepository } from "@/domain/repositories/IProfileRepository";
import { UserInput, PrivacySetting, Profile } from "@/domain/entities/Profile";
import supabase from "@/infrastructure/databases/supabase/server";

export class SbProfileRepository implements IProfileRepository {
  getProfileDetails: any;
  updateProfile(userId: string, profileData: Partial<Profile>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getProfile(userId: string): Promise<{
    userData: {
      user_id: string;
      name: string;
      birth_date: string;
      phone: string;
      email: string;
      created_at: string;
      updated_at: string;
    };
    categories: Record<string, string[]>;
    userInputs: UserInput[];
    snsData: { SNS_Type: string; SNS_id: string; is_public: boolean }[];
    isPublicData: PrivacySetting;
  }> {
    const supabaseClient = await supabase();

    // ✅ 1. 기본 사용자 정보 조회
    const { data: userData, error: userError } = await supabaseClient
      .from("user")
      .select("user_id, name, birth_date, phone, email, created_at, updated_at")
      .eq("user_id", userId)
      .single();

    if (userError) throw new Error(userError.message);
    if (!userData) throw new Error("User not found");

    // ✅ 2. 카테고리 테이블 조회
    const { data: categories, error: categoryError } = await supabaseClient
      .from("category")
      .select("category_id, category_name");

      if (categoryError || !categories) {
        console.error("❌ Categories 데이터 조회 실패:", categoryError?.message);
        throw new Error(categoryError?.message || "Categories not found");
      }

    // ✅ 3. 유저 입력값 조회
    const { data: userInputs, error: userInputError } = await supabaseClient
      .from("userInput")
      .select("category_id, answer")
      .eq("user_id", userId);
      console.log("✅ userInputs from DB:", userInputs);

    if (userInputError) throw new Error(userInputError.message);

    // ✅ 4. SNS 정보 조회
    const { data: snsData, error: snsError } = await supabaseClient
      .from("SNSInformation")
      .select("SNS_Type, SNS_id, is_public")
      .eq("user_id", userId);

    if (snsError) throw new Error(snsError.message);

    // ✅ 5. 공개 여부 정보 조회
    const { data: isPublicData, error: isPublicError } = await supabaseClient
      .from("isPublic")
      .select("phone_isPublic, email_isPublic")
      .eq("user_id", userId)
      .single();

    if (isPublicError) throw new Error(isPublicError.message);
    if (!isPublicData) throw new Error("Privacy settings not found");

 // ✅ 5. 카테고리별 사용자 입력 매칭
 const categorizedData = categories.reduce((acc, category) => {
  const userAnswers = userInputs
    .filter((input) => input.category_id === category.category_id)
    .map((input) => (input.answer ? input.answer.split(", ") : []))
    .flat();

  acc[category.category_name] = userAnswers.length > 0 ? userAnswers : [""];
  return acc;
}, {} as Record<string, string[]>);


    // **데이터만 반환 (가공하지 않음)**
    return {
      userData,
      categories: categorizedData,
      userInputs,
      snsData,
      isPublicData,
    };
  }
}
