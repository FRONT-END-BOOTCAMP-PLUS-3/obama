import { OpenQuestion } from "@/domain/entities/smalltalk/OpenQuestion";
import { IOpenQuestionRepository } from "@/domain/repositories/smalltalk/IOpenQuestionRepository";
import supabase from "@/infrastructure/databases/supabase/server";
import { toCamelCase } from "@/utils/convert/convertToCase";

export class SbOpenQuestionRepository implements IOpenQuestionRepository {
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
      .order("openquestion_id", { ascending: true });

    if (error) {
      console.error("Error fetching all open questions:", error);
      throw new Error("Failed to fetch all open questions");
    }

    return toCamelCase(data) || [];
  }
}
