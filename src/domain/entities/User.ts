export interface User {
    user_id: string;
    email: string;
    name: string;
    password: string;
    birth_date: string;
    phone: string;
    created_at?: Date;
    updated_at?: Date;
}