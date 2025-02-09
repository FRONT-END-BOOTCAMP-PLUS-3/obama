import { IIsPublicRepository  } from "@/domain/repositories/profile/IIsPublicRepository";
import { IsPublicDTO } from "@/application/usecases/profile/dtos/IsPublicDTO";

export class UpdatePrivacySettingUsecase {
  constructor(
    private readonly IIsPublicRepository: IIsPublicRepository 
  ) {}

  // 개인정보 설정 업데이트
  async execute(userId: string, settings: IsPublicDTO[]): Promise<void> {
    await this.IIsPublicRepository.update(userId, settings);
  }
}
