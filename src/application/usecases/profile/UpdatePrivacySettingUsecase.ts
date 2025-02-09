import { IPrivacySettingRepository } from "@/domain/repositories/profile/IPrivacySettingRepository";
import { PrivacySettingDTO } from "@/application/usecases/profile/dtos/PrivacySettingDTO";

export class UpdatePrivacySettingUsecase {
  constructor(
    private readonly IPrivacySettingRepository: IPrivacySettingRepository
  ) {}

  // 개인정보 설정 업데이트
  async execute(userId: string, setting: PrivacySettingDTO): Promise<void> {
    await this.IPrivacySettingRepository.update(userId, setting);
  }
}
