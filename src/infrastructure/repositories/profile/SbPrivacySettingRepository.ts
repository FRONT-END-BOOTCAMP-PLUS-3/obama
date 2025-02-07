import { IPrivacySettingRepository } from "@/domain/repositories/profile/IPrivacySettingRepository";
import { PrivacySetting } from "@/domain/entities/profile/PrivacySetting";
import supabase from '@/infrastructure/databases/supabase/server';

export class SbPrivacySettingRepository implements IPrivacySettingRepository {

// 개인정보 공개설정 조회
  async findAllByUserId(userId: string): Promise<PrivacySetting[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("isPublic")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data as PrivacySetting[];

  }
// 특정 공개 설정 업데이트
  async update(userId: string, updateData: Record<string, boolean>): Promise<void> {
    const client = await supabase();
    const { error } = await client
      .from("isPublic")
      .update(updateData)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  }
}
