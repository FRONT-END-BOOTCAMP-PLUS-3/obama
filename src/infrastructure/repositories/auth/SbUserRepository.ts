import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { createClient } from '@/utils/supabase/server';

export class SbUserRepository implements IUserRepository {
    private readonly tableName = 'user';
    async createUser(user: User): Promise<void> {
        const supabase = await createClient();

        const {error} = await supabase.from(this.tableName).insert(user);
    
        if (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
    
}