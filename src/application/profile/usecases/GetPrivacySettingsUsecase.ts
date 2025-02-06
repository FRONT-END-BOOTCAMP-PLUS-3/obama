import { IPrivacySettingRepository } from "@/domain/repositories/IPrivacySettingRepository";
import { PrivacySettingDTO } from "@/application/profile/dtos/PrivacySettingDTO";

export class PrivacySettingsUsecase {
  constructor(
    private readonly privacySettingRepository: IPrivacySettingRepository
  ) {}

  // 개인정보 설정 가져오기
  async getPrivacySettings(userId: string): Promise<PrivacySettingDTO[]> {
    return await this.privacySettingRepository.getPrivacySettings(userId);
  }

  // 개인정보 설정 업데이트
  async updatePrivacySetting(
    userId: string,
    setting: PrivacySettingDTO
  ): Promise<void> {
    await this.privacySettingRepository.updatePrivacySetting(userId, setting);
  }
}
