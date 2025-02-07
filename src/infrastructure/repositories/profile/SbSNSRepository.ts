import { ISNSRepository } from "@/domain/repositories/profile/ISNSRepository";
import { SNSInformation } from "@/domain/entities/profile/SNSInformation";
import supabase from "@/infrastructure/databases/supabase/server";

export class SNSRepository {
    async findAllByUserId(userId: number): Promise<SNSInformation[]> {
    const client = await supabase();
      const { data, error } = await client
        .from("SNSInformation")
        .select("SNS_Type, SNS_id, is_public")
        .eq("user_id", userId);
  
      if (error) throw new Error("SNS information not found");
      return data;
    }
  }
  