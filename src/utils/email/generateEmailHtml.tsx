import ReactDOMServer from "react-dom/server";
import SendEmailTemplate from "@/components/email/SendEmailTemplate";

export function generateEmailHtml(verificationCode: string): string {
    const emailContent =  ReactDOMServer.renderToStaticMarkup(
        <SendEmailTemplate verificationCode={verificationCode} />
    );

return `<!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>이메일 인증</title>
      <style>
        body { font-family: 'Pretendard', sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .email-container { max-width: 540px; margin: auto; background: #ffffff; padding: 20px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="email-container">
        ${emailContent}
      </div>
    </body>
  </html>`;
}