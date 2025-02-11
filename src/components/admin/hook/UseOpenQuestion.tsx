import { useState, useCallback } from "react";
import { OpenQuestionDto } from "@/application/usecases/smalltalk/dto/OpenQuestion";
import { fetchClient } from "@/utils/api/fetchClient"; 

export function UseOpenQuestion() {
  const [data, setData] = useState<OpenQuestionDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllOpenQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const { status, data, error } = await fetchClient<undefined, { questions: OpenQuestionDto[] }>(
        "/api/admin/smalltalk/openquestion",
        { method: "GET" }
      );

      if (status === 200 && data) {
        setData(data.questions);
      } else {
        throw new Error(error || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching open questions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuestion = useCallback(async (subjectId: number, openQuestion: string) => {
    try {
      const { status, error } = await fetchClient<{ subjectId: number; openQuestion: string }, void>(
        "/api/admin/smalltalk/openquestion",
        {
          method: "POST",
          body: { subjectId, openQuestion },
        }
      );

      if (status === 200) {
        alert("Question added successfully!");
        await fetchAllOpenQuestions();
      } else {
        throw new Error(error || "Failed to add question");
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }, [fetchAllOpenQuestions]);

  const updateQuestion = useCallback(async (questionId: number, openQuestion: string) => {
    try {
      const { status, error } = await fetchClient<{ questionId: number; openQuestion: string }, void>(
        "/api/admin/smalltalk/openquestion",
        {
          method: "PATCH",
          body: { questionId, openQuestion },
        }
      );

      if (status === 200) {
        alert("Question updated successfully!");
        await fetchAllOpenQuestions();
      } else {
        throw new Error(error || "Failed to update question");
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  }, [fetchAllOpenQuestions]);

  const deleteQuestion = useCallback(async (questionId: number) => {
    try {
      const { status, error } = await fetchClient<{ questionId: number }, void>(
        "/api/admin/smalltalk/openquestion",
        {
          method: "DELETE",
          body: { questionId },
        }
      );

      if (status === 200) {
        alert("Question deleted successfully!");
        await fetchAllOpenQuestions();
      } else {
        throw new Error(error || "Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }, [fetchAllOpenQuestions]);

  return {
    data,
    loading,
    fetchAllOpenQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
}
