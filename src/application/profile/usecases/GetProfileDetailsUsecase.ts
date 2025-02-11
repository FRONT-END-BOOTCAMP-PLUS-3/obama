import { IProfileRepository } from "@/domain/repositories/IProfileRepository";
import { ProfileDetailsDTO } from "../dtos/ProfileDetailsDTO";
import { createClient } from "@/infrastructure/databases/supabase/server";

export class GetProfileDetailsUsecase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(userId: string): Promise<ProfileDetailsDTO> {
    const supabase = createClient();

    // ✅ user 테이블에서 기본 프로필 정보 가져오기
    const { data: userProfile, error: userError } = await supabase
      .from("user")
      .select("name, birth_date, phone, email")
      .eq("user_id", userId)
      .single();

    if (userError) throw new Error(userError.message);

    // ✅ isPublic 테이블에서 공개 설정 정보 가져오기
    const { data: privacySettings, error: privacyError } = await supabase
      .from("isPublic")
      .select("phone_isPublic, email_isPublic")
      .eq("user_id", userId)
      .single();

    if (privacyError) throw new Error(privacyError.message);

    return {
      name: userProfile.name,
      birth_date: userProfile.birth_date,
      phone: privacySettings.phone_isPublic ? userProfile.phone : "비공개",
      email: privacySettings.email_isPublic ? userProfile.email : "비공개",
    };
  }
}
