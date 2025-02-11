import supabase from "@/infrastructure/databases/supabase/server";
import { toCamelCase } from "@/utils/convert/convertToCase";
import { BalancegameAnswer } from "@/domain/entities/smalltalk/BalancegameAnwer";
import { IBalancegameAnswerRepository } from "@/domain/repositories/smalltalk/IBalancegameAnswerRepository";

export class SbBalancegameAnswerRepository implements IBalancegameAnswerRepository {
  async findAnswersByQuestionId(questionId: number): Promise<BalancegameAnswer[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("balancegameAnswer")
      .select("*")
      .eq("balancegamequestion_id", questionId)
      .order("balancegameanswer_id", { ascending: true });

    if (error) {
      console.error("Error fetching balancegame answers: ", error);
      throw new Error("Failed to fetch balancegame answers");
    }

    return toCamelCase(data) || [];
  }

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

  async updateAnswer(
    answerId: number,
    answerTitle: string,
    answerText: string
  ): Promise<void> {
    const client = await supabase();
    const { error } = await client
      .from("balancegameAnswer")
      .update({
        balancegameanswer_title: answerTitle,
        balancegameanswer_text: answerText,
      })
      .eq("balancegameanswer_id", answerId);

    if (error) {
      console.error("Error updating answer: ", error);
      throw new Error("Failed to update answer: " + error.message);
    }
  }
}
