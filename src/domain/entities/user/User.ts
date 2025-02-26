import { UserRole } from "@/types/auth";

export interface User {
    userId: string;
    email: string;
    name: string;
    password: string;
    birthDate: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
    role?: UserRole;
}