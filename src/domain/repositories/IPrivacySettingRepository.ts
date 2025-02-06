import { PrivacySetting } from "../entities/PrivacySetting";

export interface IPrivacySettingRepository {
  getPrivacySettings(userId: string): Promise<PrivacySetting[]>;
  updatePrivacySetting(userId: string, setting: PrivacySetting): Promise<void>;
}
