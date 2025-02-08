import supabase from "@/infrastructure/databases/supabase/server";
import { IsmalltalkSubjectRepository } from "@/domain/repositories/smalltalk/ISmalltalkSubjectRepository";
import { SmalltalkSubject } from "@/domain/entities/smalltalk/SmalltalkSubject";
import { toCamelCase } from "@/utils/convert/convertToCase"; 

export class SbSmalltalkRepository implements IsmalltalkSubjectRepository {
  async findAll(): Promise<SmalltalkSubject[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("smalltalkSubject")
      .select("*");

    if (error) {
      console.error("Database error while fetching all subjects:", error.message);
      throw new Error("Database error while fetching subjects");
    }

    return toCamelCase(data); 
  }

  async findById(id: number): Promise<SmalltalkSubject | null> {
    const client = await supabase();
    const { data, error } = await client
      .from("smalltalkSubject")
      .select("*")
      .eq("subject_id", id) 
      .single();

    if (error) {
      if (error.message.includes("No rows found")) {
        return null;
      }

      console.error("Database error while finding subject by ID:", error.message);
      throw new Error("Database error while finding subject by ID");
    }

    return toCamelCase(data); 
  }
}
