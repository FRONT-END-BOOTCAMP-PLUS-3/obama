import { BalancegameQuestion } from "@/domain/entities/smalltalk/BalancegameQuestion";
import { IBalancegameQuestionRepository } from "@/domain/repositories/smalltalk/IBalancegameQuestionRepository";
import supabase from "@/infrastructure/databases/supabase/server";

export class SbBalancegameQuestionRepository implements IBalancegameQuestionRepository{
  async findBySubjectId(subjectId: number): Promise<BalancegameQuestion[]> {
    const client = await supabase();
    const {data, error} = await client
      .from("balancegameQuestion")
      .select("*")
      .eq("subject_id", subjectId);

      if(error){
        console.error("Error fetching balancegame questions: ", error)
        throw new Error("Failed to fetch balancegame questions");
      }

      return data || [];

  }
}
