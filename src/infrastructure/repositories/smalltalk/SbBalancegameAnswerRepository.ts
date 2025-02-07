import { BalancegameAnswer } from "@/domain/entities/smalltalk/BalancegameAnwer";
import { IBalancegameAnswerRepository } from "@/domain/repositories/smalltalk/IBalancegameAnswerRepository";
import supabase from "@/infrastructure/databases/supabase/server";

export class SbBalancegameAnswerRepository implements IBalancegameAnswerRepository {
  async findAnswersByQuestionId(questionId: number): Promise<BalancegameAnswer[]> {
    const client = await supabase();
    const {data ,error} = await client
      .from("balancegameAnswer")
      .select("*")
      .eq("balancegamequestion_id", questionId);
    
    if(error){
      console.error("Error fetching balancegame answers: ", error)
      throw new Error("Failed to fetch balancegame answers");
    }
    return data || [];
  }
}
