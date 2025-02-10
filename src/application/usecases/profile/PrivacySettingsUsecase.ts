import { IIsPublicRepository } from "@/domain/repositories/profile/IIsPublicRepository";
import { IsPublicDTO } from "@/application/usecases/profile/dtos/IsPublicDTO";

export class GetPrivacySettingsUsecase {
  constructor(
    private readonly isPublicRepository: IIsPublicRepository
  ) {}

  // 개인정보 설정 가져오기
  async execute(userId: string): Promise<IsPublicDTO[]> {
    return await this.isPublicRepository.findByUserId(userId);
  }
}
