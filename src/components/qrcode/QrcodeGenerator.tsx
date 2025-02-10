import { FC } from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";

type QRCodeGeneratorProps = {
  url: string;
  size?: number;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UrlText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  word-break: break-all;
`;

const QRCodeGenerator: FC<QRCodeGeneratorProps> = ({ url, size = 200 }) => {
  return (
    <Container>
      <QRCode value={url} size={size} />
      <UrlText>{url}</UrlText>
    </Container>
  );
};

export default QRCodeGenerator;
