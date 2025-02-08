import { IPrivacySettingRepository } from "@/domain/repositories/profile/IPrivacySettingRepository";
import { PrivacySettingDTO } from "@/application/usecases/profile/dtos/PrivacySettingDTO";

export class GetPrivacySettingsUsecase {
  constructor(
    private readonly privacySettingRepository: IPrivacySettingRepository
  ) {}

  // 개인정보 설정 가져오기
  async execute(userId: string): Promise<PrivacySettingDTO[]> {
    return await this.privacySettingRepository.findAllByUserId(userId);
  }
}
