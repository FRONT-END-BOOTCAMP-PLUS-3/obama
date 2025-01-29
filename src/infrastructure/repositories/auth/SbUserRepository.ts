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
    
}