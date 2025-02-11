import supabase from "@/infrastructure/databases/supabase/server";
import { toCamelCase } from "@/utils/convert/convertToCase";
import { BalancegameQuestion } from "@/domain/entities/smalltalk/BalancegameQuestion";
import { IBalancegameQuestionRepository } from "@/domain/repositories/smalltalk/IBalancegameQuestionRepository";

export class SbBalancegameQuestionRepository implements IBalancegameQuestionRepository {
  async findBySubjectId(subjectId: number): Promise<BalancegameQuestion[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("balancegameQuestion")
      .select("*")
      .eq("subject_id", subjectId);

    if (error) {
      console.error("Error fetching balancegame questions: ", error);
      throw new Error("Failed to fetch balancegame questions");
    }

    return toCamelCase(data) || [];
  }

  async createBalancegameQuestion(
    subjectId: number,
    balancegamequestionText: string
  ): Promise<BalancegameQuestion[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("balancegameQuestion")
      .insert([
        {
          subject_id: subjectId,
          balancegamequestion_text: balancegamequestionText,
        },
      ])
      .select("*");

    if (error) {
      console.error("Error creating balancegame question: ", error);
      throw new Error("Failed to create balancegame question");
    }

    return toCamelCase(data) || [];
  }

  async updateQuestion(
    questionId: number,
    questionText: string
  ): Promise<void> {
    const client = await supabase();
    const { error } = await client
      .from("balancegameQuestion")
      .update({ balancegamequestion_text: questionText })
      .eq("balancegamequestion_id", questionId);

    if (error) {
      console.error("Error updating question: ", error);
      throw new Error("Failed to update question: " + error.message);
    }
  }

  async deleteQuestion(questionId: number): Promise<void> {
    const client = await supabase();
    const { error } = await client
      .from("balancegameQuestion")
      .delete()
      .eq("balancegamequestion_id", questionId);

    if (error) {
      console.error("Error deleting balancegame question: ", error);
      throw new Error("Failed to delete balancegame question: " + error.message);
    }
  }
}