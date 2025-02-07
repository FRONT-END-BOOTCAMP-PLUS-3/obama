import { IUserInputRepository } from "@/domain/repositories/profile/IUserinputRepository";
import { UserInputDto } from "./UserInputDto";
import { UserInput } from "@/domain/entities/profile/UserInput";

export class UserInputUseCase {
  constructor(private userInputRepository: IUserInputRepository) {}

  async execute(dto: UserInputDto): Promise<UserInput> {
    const newUserInput: UserInput = {
      userInput_id: crypto.randomUUID(),
      category_id: dto.categoryId,
      answer: dto.answer,
      userId: dto.userId,
    };

    return this.userInputRepository.create(newUserInput);
  }
}
