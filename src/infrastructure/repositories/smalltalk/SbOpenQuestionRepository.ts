import { OpenQuestion } from "@/domain/entities/smalltalk/OpenQuestion";
import { IOpenQuestionRepository } from "@/domain/repositories/smalltalk/IOpenQuestionRepository";
import supabase from "@/infrastructure/databases/supabase/server";
import { toCamelCase, toSnakeCase } from "@/utils/convert/convertToCase";

export class SbOpenQuestionRepository implements IOpenQuestionRepository {

  async create(question: { subjectId: number; openQuestion: string }): Promise<void> {
    const client = await supabase();
    const snakeData = toSnakeCase({
      subjectId: question.subjectId,
      openQuestion: question.openQuestion,
    });

    const { error } = await client.from("smalltalkSuggestOpenquestion").insert(snakeData);

    if (error) {
      console.error("Error adding open question:", error);
      throw new Error("Failed to add open question");
    }
  }

  async findBySubjectId(subjectId: number): Promise<OpenQuestion[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("smalltalkSuggestOpenquestion")
      .select("*")
      .eq("subject_id", subjectId);

    if (error) {
      console.error("Error fetching open questions:", error);
      throw new Error("Failed to fetch open questions");
    }

    return toCamelCase(data) || [];
  }

  async findAll(): Promise<OpenQuestion[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("smalltalkSuggestOpenquestion")
      .select("*")
      .order("subject_id", { ascending: true});

    if (error) {
      console.error("Error fetching all open questions:", error);
      throw new Error("Failed to fetch all open questions");
    }

    return toCamelCase(data) || [];
  }

  async update(questionId: number, updatedQuestion: string): Promise<void> {
    const client = await supabase();
    const { error } = await client
      .from("smalltalkSuggestOpenquestion")
      .update({ open_question: updatedQuestion })
      .eq("openquestion_id", questionId);

    if (error) {
      console.error("Error updating open question:", error);
      throw new Error("Failed to update open question");
    }
  }

}
