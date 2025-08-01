import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frienchy - 프랜차이즈 창업 AI 상담",
  description: "프랜차이즈 창업을 처음 고민하는 이들을 위한 공공데이터 기반 RAG AI 상담 플랫폼",
  keywords: "프랜차이즈, 창업, AI상담, 상권분석, 가맹점",
  authors: [{ name: "Frienchy Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
