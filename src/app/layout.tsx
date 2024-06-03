import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "哲學健康檢查 | 你以為你以為的就是你以為的嗎？",
  description: "本份題目摘自《你以為你以為的就是你以為的嗎？：12道檢測思考清晰度的哲學闖關遊戲》一書，詳細說明請見書中分析。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-dvh overflow-hidden m-auto relative max-w-screen-md text-xl leading-8 md:text-base')}>
        <div className="flex flex-col px-4 h-full overflow-y-auto">
          {children}
        </div>
      </body>
      {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-KCD245W2L9" />}
    </html>
  );
}
