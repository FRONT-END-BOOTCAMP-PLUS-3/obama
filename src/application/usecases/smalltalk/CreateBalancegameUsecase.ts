import { IBalancegameQuestionRepository } from "@/domain/repositories/smalltalk/IBalancegameQuestionRepository";
import { IBalancegameAnswerRepository } from "@/domain/repositories/smalltalk/IBalancegameAnswerRepository";
import { BalancegameQuestion } from "@/domain/entities/smalltalk/BalancegameQuestion";
import { BalancegameAnswer } from "@/domain/entities/smalltalk/BalancegameAnwer";

interface CreateBalancegameInput {
  subjectId: number;
  questionText: string;
  answerA: { title: string; text: string };
  answerB: { title: string; text: string };
}

interface CreateBalancegameOutput {
  question: BalancegameQuestion;
  answers: [BalancegameAnswer, BalancegameAnswer]; 
}

export class CreateBalanceGameUsecase {
  constructor(
    private readonly questionRepo: IBalancegameQuestionRepository,
    private readonly answerRepo: IBalancegameAnswerRepository
  ) {}

  public async execute(input: CreateBalancegameInput): Promise<CreateBalancegameOutput> {
    const { subjectId, questionText, answerA, answerB } = input;


    const createdQuestions = await this.questionRepo.createBalancegameQuestion(
      subjectId,
      questionText
    );

    if (!createdQuestions.length) {
      throw new Error("Failed to create balancegame question");
    }

    const [createdQuestion] = createdQuestions;
    const questionId = createdQuestion.balancegamequestionId;

    const createdA = await this.answerRepo.createBalancegameAnswer(
      questionId,
      answerA.title,
      answerA.text
    );
    if (!createdA.length) {
      throw new Error("Failed to create answer A");
    }

    const createdB = await this.answerRepo.createBalancegameAnswer(
      questionId,
      answerB.title,
      answerB.text
    );
    if (!createdB.length) {
      throw new Error("Failed to create answer B");
    }

    const [answerObjA] = createdA;
    const [answerObjB] = createdB;

    return {
      question: createdQuestion,
      answers: [answerObjA, answerObjB],
    };
  }
}
