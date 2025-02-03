"use client"
import React from "react";

interface SendEmailTemplateProps {
    verificationCode: string; 
}
const SendEmailTemplate: React.FC<SendEmailTemplateProps> = ({
  verificationCode,
}) => {
  return (
    <>
      {/* 이메일 컨테이너 */}
      <div
        style={{
          width: "33.75rem",
          height: "auto",
          borderTop: "4px solid #89D9E9", // var(--primary-color) 대신 직접 색상 적용
          borderBottom: "2px solid #d0d0d0",
          margin: "0.625rem",
          padding: "1.875rem",
          textAlign: "left",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        {/* 제목 */}
        <h2
          style={{
            fontSize: "1.5rem",
            color: "#89D9E9",
          }}
        >
          sotok 가입 인증코드 안내입니다.
        </h2>

        {/* 본문 내용 */}
        <div style={{ margin: "3.75rem 0" }}>
          <p style={{ fontSize: "0.875rem", marginBottom: "0.625rem" }}>
            안녕하세요.
          </p>
          <p style={{ fontSize: "0.875rem", marginBottom: "0.625rem" }}>
            요청하신 이메일 인증 코드가 생성되었습니다.
          </p>
          <p style={{ fontSize: "0.875rem", marginBottom: "0.625rem" }}>
            아래{" "}
            <strong style={{ color: "#89D9E9" }}>
              ‘인증 코드’
            </strong>{" "}
            복사하여, 인증 코드를 입력하여 이메일 인증을 완료해주세요.
          </p>
          <p style={{ fontSize: "0.875rem", marginBottom: "0" }}>감사합니다.</p>
        </div>

        {/* 인증 코드 섹션 */}
        <div style={{ marginTop: "3.75rem", fontSize: "1rem", fontWeight: "bold" }}>
          인증 코드
        </div>

        {/* 인증 코드 박스 */}
        <div
          style={{
            marginTop: "1.25rem",
            display: "inline-block",
            textAlign: "center",
            width: "100%",
            height: "3.125rem",
            maxWidth: "8rem",
            backgroundColor: "#89D9E9",
            fontSize: "1rem",
            borderRadius: "0.5rem",
            color: "#404040",
            lineHeight: "3.125rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {verificationCode}
        </div>
      </div>
    </>
  );
};
export default SendEmailTemplate;
