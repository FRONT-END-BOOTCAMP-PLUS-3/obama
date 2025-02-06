import { Question, QuestionMark, LogoGreySmalltalk, ExclamationMark, LogoSmalltalk } from "@/components/smaltalk/Suggest.Styled";

export default function OpenQuestion() {
  return (
    <div>
      <Question>당신의 취미는 무엇인가요?</Question>
      <QuestionMark src="/Icons/questionMark.svg" alt="question mark"/>
      <LogoGreySmalltalk src="/Images/logoGrey.svg" alt="logoGrey"/>
      <ExclamationMark src="/Icons/exclamationMark.svg" alt="exclamation mark"/>
      <LogoSmalltalk src="/Images/logo.svg" alt="logo"/>
    </div>
  );
}
