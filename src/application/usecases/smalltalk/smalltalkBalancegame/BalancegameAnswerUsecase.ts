import { IBalancegameAnswerRepository } from "@/domain/repositories/smalltalk/IBalancegameAnswerRepository";
import { BalancegameAnswerDto } from "./dto/BalancegameAnswer";

export class BalancegameAnswerUsecase {
  constructor(private readonly repository: IBalancegameAnswerRepository){}
  async execute(questionId: number): Promise<BalancegameAnswerDto[]> {
    const answers = await this.repository.findAnswersByQuestionId(questionId);

    const answersDto = answers.map(answer => ({
      balancegameanswerId: answer.balancegameanswer_id,
      balancegamequestionId: answer. balancegamequestion_id,
      balancegameanswerTitle: answer. balancegameanswer_title, 
      balancegameanswerText: answer. balancegameanswer_text
    }));

    return answersDto;
  }
}