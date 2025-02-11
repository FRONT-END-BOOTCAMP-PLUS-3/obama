import { IBalancegameQuestionRepository } from "@/domain/repositories/smalltalk/IBalancegameQuestionRepository";
import { IBalancegameAnswerRepository } from "@/domain/repositories/smalltalk/IBalancegameAnswerRepository";

export class DeleteBalancegameUsecase {
  private questionRepository: IBalancegameQuestionRepository;
  private answerRepository: IBalancegameAnswerRepository;

  constructor(
    questionRepository: IBalancegameQuestionRepository,
    answerRepository: IBalancegameAnswerRepository
  ) {
    this.questionRepository = questionRepository;
    this.answerRepository = answerRepository;
  }

  async execute(questionId: number): Promise<void> {  

      await this.answerRepository.deleteAnswersByQuestionId(questionId);
      await this.questionRepository.deleteQuestion(questionId);
  }
}
