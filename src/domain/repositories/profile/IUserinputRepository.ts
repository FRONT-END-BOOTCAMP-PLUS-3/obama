import { UserInput } from "@/domain/entities/profile/UserInput";

export interface IUserInputRepository {
  findAllByUserId(userId: string): Promise<UserInput[]>;
  create(userInput: UserInput): Promise<UserInput>; // 🔹 create 메서드 추가
}
