import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | 哲學健康檢查 | 你以為你以為的就是你以為的嗎？",
    default: "哲學健康檢查 | 你以為你以為的就是你以為的嗎？",
  },
  description: "本份題目摘自《你以為你以為的就是你以為的嗎？：12道檢測思考清晰度的哲學闖關遊戲》一書，詳細說明請見書中分析。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="uGvkPpDqOa1JG9TCt9UKse_33FJ9sBhkwJka9-xytg4" />
      </head>
      <body className={cn(inter.className, 'w-full h-dvh flex flex-col overflow-y-auto text-xl leading-8 md:text-base')}>
        <div className="px-4 flex-1 m-auto max-w-screen-md">
          {children}
        </div>
        <footer className="text-center text-[0.7rem] leading-[0.8rem] text-gray-500 p-4 break-keep">
          <p>本頁內容皆為出版書：Julian Baggini, Jeremy Stangroom<wbr />《你以為你以為的就是你以為的嗎？：12道檢測思考清晰度的哲學闖關遊戲》<wbr />（Do You Think What You Think You Think?: The Ultimate Philosophical Quiz Book）所有</p>
        </footer>
      </body>
      {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-KCD245W2L9" />}
    </html>
  );
}
