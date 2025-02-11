import { IIsPublicRepository } from "@/domain/repositories/profile/IIsPublicRepository";
import { IsPublic } from "@/domain/entities/profile/IsPublic";
import supabase from '@/infrastructure/databases/supabase/server';

export class SbIsPublicRepository implements IIsPublicRepository {

// 개인정보 공개설정 조회
  async findAllByUserId(userId: string): Promise<IsPublic[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("isPublic")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data as IsPublic[];

  }
}
