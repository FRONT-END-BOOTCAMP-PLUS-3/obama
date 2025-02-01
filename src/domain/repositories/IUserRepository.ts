import { User } from "@/domain/entities/User";

export interface IUserRepository {
    createUser (user: User): Promise<void>;
}