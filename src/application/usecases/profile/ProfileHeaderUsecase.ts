// usecase/GetProfileHeaderUseCase.ts
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { ISNSRepository } from "@/domain/repositories/profile/ISNSRepository";
import { ProfileHeaderDTO } from "@/application/usecases/profile/dtos/ProfileHeaderDTO";

export class GetProfileHeaderUseCase {
  constructor(
    private userRepository: IUserRepository,
    private snsRepository: ISNSRepository
  ) {}

  async execute(userId: string): Promise<ProfileHeaderDTO> {
    // 1. 유저 정보 가져오기
    const user = await this.userRepository.findByEmail(userId);
    if (!user) throw new Error("User not found");

    // 2. SNS 정보 가져오기
    const snsData = await this.snsRepository.findAllByUserId(userId);

    // 3. DTO 형태로 변환 후 반환
    return {
      user: {
        user_id: user.user_id,
        name: user.name,
        birth_date: user.birth_date,
        phone: user.phone,
      },
      snsInformation: snsData.map((sns) => ({
        SNS_Type: sns.SNS_Type,
        SNS_id: sns.SNS_id,
      })),
    };
  }
}
