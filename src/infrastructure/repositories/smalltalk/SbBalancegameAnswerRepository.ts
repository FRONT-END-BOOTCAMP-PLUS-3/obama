import supabase from "@/infrastructure/databases/supabase/server";
import { toCamelCase } from "@/utils/convert/convertToCase";
import { BalancegameAnswer } from "@/domain/entities/smalltalk/BalancegameAnwer";
import { IBalancegameAnswerRepository } from "@/domain/repositories/smalltalk/IBalancegameAnswerRepository";

export class SbBalancegameAnswerRepository implements IBalancegameAnswerRepository {
  // 이미 존재하는 findAnswersByQuestionId
  async findAnswersByQuestionId(questionId: number): Promise<BalancegameAnswer[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("balancegameAnswer")
      .select("*")
      .eq("balancegamequestion_id", questionId);

    if (error) {
      console.error("Error fetching balancegame answers: ", error);
      throw new Error("Failed to fetch balancegame answers");
    }

    return toCamelCase(data) || [];
  }

  // 새롭게 추가하는 createBalancegameAnswer
  async createBalancegameAnswer(
    balancegamequestionId: number,
    balancegameanswerTitle: string,
    balancegameanswerText: string
  ): Promise<BalancegameAnswer[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("balancegameAnswer")
      .insert([
        {
          balancegamequestion_id: balancegamequestionId,
          balancegameanswer_title: balancegameanswerTitle,
          balancegameanswer_text: balancegameanswerText,
        },
      ])
      .select("*");

    if (error) {
      console.error("Error creating balancegame answer: ", error);
      throw new Error("Failed to create balancegame answer");
    }

    return toCamelCase(data) || [];
  }
}
