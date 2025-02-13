import supabase from "@/infrastructure/databases/supabase/server";
import { IIsPublicRepository } from "@/domain/repositories/profile/IIsPublicRepository";
import { IsPublic } from "@/domain/entities/profile/IsPublic";
import { toCamelCase } from "@/utils/convert/convertToCase";

export class SbIsPublicRepository implements IIsPublicRepository {
  async findByUserId(user_id: string): Promise<IsPublic[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("isPublic")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw new Error("isPublic data not found");


    console.log("🔹 Supabase Raw Data:", data);

    return toCamelCase(data) as IsPublic[];
  }
}
