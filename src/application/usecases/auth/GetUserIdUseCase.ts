import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { UserIdRequestDto } from "./dtos/userIdRequestDto";

export class GetUserIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(requestDto: UserIdRequestDto): Promise<string | null> {
    return await this.userRepository. findIdByNameAndPhoneAndEmailAndBirthDate(requestDto);
  }
}
