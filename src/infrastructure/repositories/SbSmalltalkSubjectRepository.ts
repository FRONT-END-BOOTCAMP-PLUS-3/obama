import { createClient } from "@/infrastructure/databases/supabase/server";
import { IsmalltalkSubjectRepository } from "@/domain/repositories/ISmalltalkSubjectRepository";
import { SmalltalkSubject } from "@/domain/entities/SmalltalkSubject";

export class SbSmalltalkRepository implements IsmalltalkSubjectRepository {
  async findAll(): Promise<SmalltalkSubject[]> {
    const supabase = await createClient();
    const {data, error} = await supabase
    .from("smalltalkSubject")
    .select("*");

    if(error){
      throw new Error(error.message);
      }

    return data as SmalltalkSubject[];
    }

    async findById(id: number): Promise<SmalltalkSubject | null> {
      const supabase = await createClient();
      const {data, error} = await supabase
      .from("smalltalkSubject")
      .select("*")
      .eq("subject_id", id)
      .single();

      if(error){
        return null;
      }

      return data as SmalltalkSubject;
    }
}
