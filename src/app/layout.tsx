import NavBar from "./components/common/NavBar/NavBar";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main> {/* 페이지의 실제 콘텐츠는 여기 */}
        <NavBar /> {/* 모든 페이지 하단에 NavBar 추가 */}
      </body>
    </html>
  );
}
