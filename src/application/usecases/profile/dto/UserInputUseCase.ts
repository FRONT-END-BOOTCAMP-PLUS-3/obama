import { IUserInputRepository } from "@/domain/repositories/profile/IUserinputRepository";
import { UserInputDto } from "./UserInputDto";
import { UserInput } from "@/domain/entities/profile/UserInput";

export class UserInputUseCase {
  constructor(private userInputRepository: IUserInputRepository) {}

  async execute(dto: UserInputDto): Promise<UserInput> {
    const newUserInput: Omit<UserInput, "userInput_id"> = {
      categoryId: Number(dto.categoryId), // 🔹 여기서 변환
      answer: dto.answer,
      userId: dto.userId,
    };

    return this.userInputRepository.create(newUserInput);
  }
}
