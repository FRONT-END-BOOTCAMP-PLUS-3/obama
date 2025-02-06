import { BalanceGameQuestion, BalanceGameAnswer, AnswerTitle, Answer } from "@/components/smaltalk/Suggest.Styled";


export default function BalanceGame() {
  return (
    <div>
      <BalanceGameQuestion>당신이 사귀고 싶은 연인 유형은?</BalanceGameQuestion>
      <BalanceGameAnswer>
        <AnswerTitle>A . 자동차를 너무 좋아하는 연인</AnswerTitle>
        <Answer>
            어디를 가도 무조건 차로 가야함. 
            집 앞 편의점을 가도 차 끌고 다님. 
            해외도 차로 횡단함. 다른 교통수단 안됨.
            집에 놀러온다고 했을 때 진짜 차로 문을 
            부수고 들어온 적이 있음
        </Answer>
      </BalanceGameAnswer>
      <BalanceGameAnswer>
        <AnswerTitle>B . 걷는것을 너무 좋아하는 연인</AnswerTitle>
        <Answer>
          어디를 가도 걸어가야함. 
          비행기 외 다른 교통수단 이용 못함
          부산까지 걸어서 30일 걸린 적이 있음
          집 갈때에도 걸어서 10일정도 걸음
          해외 정도는 비행기 탑승가능함
          단, 공항까진 걸어서 가야함
        </Answer>
      </BalanceGameAnswer>
    </div>
  );
}