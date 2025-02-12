import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { UserResponseDto } from "./dtos/UserResponseDto";

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string) {
    if (!userId) throw new Error("userId is required.");

    // DB에서 가져온 {password, user}데이터
    const userData = await this.userRepository.findUserById(userId);

    // 유효성 검사
    if (!userData) {
      throw new Error("User not found.");
    }

    // password를 제외한 사용
    const { user } = userData;

    //DTO변환
    const userResponseDto: UserResponseDto = {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      phone: user.phone,
    };

    return userResponseDto;
  }
}
