import { IIsPublicRepository } from "@/domain/repositories/profile/IIsPublicRepository";
import { IsPublic } from "@/domain/entities/profile/IsPublic";
import supabase from "@/infrastructure/databases/supabase/server";
import { IsPublicDTO } from "@/application/usecases/profile/dtos/IsPublicDTO";

export class SbIsPublicRepository implements IIsPublicRepository {
  update(userId: string, settings: IsPublicDTO[] | IsPublic[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findByUserId(userId: string): Promise<IsPublic[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("isPublic")
      .select("*")
      .eq("userId", userId);

    if (error) throw new Error(error.message);
    return data as IsPublic[];
  }
}
