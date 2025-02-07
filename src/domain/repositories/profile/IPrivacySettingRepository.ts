import { PrivacySetting } from "@/domain/entities/profile/PrivacySetting";

export interface IPrivacySettingRepository {
  findAllByUserId(userId: string): Promise<PrivacySetting[]>;
  update(userId: string, setting: Record<string, boolean>): Promise<void>;
}
