import { IPrivacySettingRepository } from "@/domain/repositories/IPrivacySettingRepository";
import { PrivacySetting } from "@/domain/entities/PrivacySetting";
import { createClient } from "@/infrastructure/databases/supabase/server";

export class SbPrivacySettingRepository implements IPrivacySettingRepository {
  private supabase = createClient();

  async getPrivacySettings(userId: string): Promise<PrivacySetting[]> {
    const { data, error } = await (await this.supabase)
      .from("isPublic")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data;
  }

  async updatePrivacySetting(
    userId: string,
    setting: PrivacySetting
  ): Promise<void> {
    const { error } = await (await this.supabase)
      .from("isPublic")
      .update({ [setting.label]: setting.isPublic }) 
      .eq("user_id", userId)
      .eq("label", setting.label);

    if (error) throw new Error(error.message);
  }
}
