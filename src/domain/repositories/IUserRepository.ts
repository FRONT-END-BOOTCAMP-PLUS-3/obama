import { User } from "@/domain/entities/User";

export interface IUserRepository {
    createUser (user: User): Promise<void>;
    findByEmail (email: string): Promise<User | null>;
}