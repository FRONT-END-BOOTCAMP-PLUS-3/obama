import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { toSnakeCase } from '@/utils/convertCase';
import { SupabaseClient } from '@supabase/supabase-js';

export class SbUserRepository implements IUserRepository {
    private readonly tableName = 'user';

    constructor(private readonly supabase: SupabaseClient) {}
    
    async createUser(user: User): Promise<void> {
        
        const userData = toSnakeCase(user);

        const {error} = await this.supabase.from(this.tableName).insert(userData);
    
        if (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async findByEmail(email: string): Promise<boolean> {
        const { data, error } = await this.supabase
        .from('user')
        .select('email')
        .eq('email', email)
        .single();

        if (error) {
            console.error("Error finding email:", error.message);
            throw new Error("Error finding email");
        }

        return !!data;
    }
    
}