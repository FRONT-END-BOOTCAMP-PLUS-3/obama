import { UserInput } from "@/domain/entities/profile/UserInput";

export interface IUserInputRepository {
  findAnswerByUserId(userId: string): Promise<UserInput[]>;
}
