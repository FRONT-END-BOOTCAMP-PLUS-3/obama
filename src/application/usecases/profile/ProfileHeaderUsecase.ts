import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { ProfileHeaderDTO } from "@/application/usecases/profile/dtos/ProfileHeaderDTO";

export class ProfileHeaderUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<ProfileHeaderDTO> {
    // 1. UUID 기반으로 유저 정보 가져오기
    const userData = await this.userRepository.findUserById(userId);
    if (!userData) throw new Error("User not found");

    const { user } = userData; // password 제외된 유저 정보만 추출

    // 3. DTO 형태로 변환 후 반환
    return {
      user: {
        userId: user.userId,  // user.userId로 접근
        name: user.name,      // user.name으로 접근
        birthDate: user.birthDate,
        phone: user.phone,
      },
    };
  }
}
