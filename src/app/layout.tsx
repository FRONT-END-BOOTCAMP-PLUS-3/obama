import NavBar from "./components/common/NavBar/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {" "}
      {/* <html> 태그 추가 */}
      <body>
        {" "}
        {/* <body> 태그 추가 */}
        <NavBar /> {/* 모든 페이지 상단에 NavBar 추가 */}
        <main>{children}</main> {/* 페이지의 실제 콘텐츠는 여기 */}
      </body>
    </html>
  );
}
