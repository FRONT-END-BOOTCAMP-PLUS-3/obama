import { SmalltalkOpenQuestion } from "@/domain/entities/smalltalk/SmalltalkOpenQuestion";
import { IsmalltalkOpenQuestionRepository } from "@/domain/repositories/smalltalk/IsmalltalkOpenQuestionRepository";
import supabase from "@/infrastructure/databases/supabase/server";

export class SbOpenQuestionRepository implements IsmalltalkOpenQuestionRepository {
  async findBySubjectId(subjectId: number): Promise<SmalltalkOpenQuestion[]> {
    const client = await supabase();
    const { data, error } = await client
      .from("smalltalkSuggestOpenquestion")
      .select("*")
      .eq("subject_id", subjectId);

    if (error) {
      console.error("Error fetching open questions:", error);
      throw new Error("Failed to fetch open questions");
    }

    return data;
  }
}
