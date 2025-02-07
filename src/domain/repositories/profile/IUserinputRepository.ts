import { UserInput } from "@/domain/entities/profile/UserInput";

export interface IUserInputRepository {
  findAllByUserId(userId: string): Promise<UserInput[]>;
}
