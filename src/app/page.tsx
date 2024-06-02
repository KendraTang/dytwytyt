import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 p-6 place-self-center items-center border border-gray-400 outline outline-2 outline-offset-4 outline-gray-400">
      <h1 className="text-2xl text-center md:break-keep">《你以為你以為的就是你以為的嗎？：<wbr />12道檢測思考清晰度的哲學闖關遊戲》</h1>
      <h2>第一關：哲學健康檢查</h2>
      <article className="text-base my-5 pl-6 pr-3">
        <ul className="list-disc flex flex-col gap-3">
          <li>本份題目摘自《你以為你以為的就是你以為的嗎？：12道檢測思考清晰度的哲學闖關遊戲》一書，歡迎大家在做完題目後，繼續挑戰書中的其他關卡。</li>
          <li>請仔細閱讀題目，決定自己是否同意其中的觀點。你不一定都會對每一句陳述感到百分之百同意或不同意，但是應該至少都會比較傾向其中一種立場。要是你真的沒有意見，就趁現在選定立場吧！</li>
          <li>不要抱著防衛心態。答錯沒什麼大不了。哲學健康檢查不會判斷你的答案究竟對或不對，請盡量誠實作答。</li>
          <li>題目中的用字都經過精心挑選，因此，作答過程中請仔細看清楚每一項陳述的意思。</li>
        </ul>
      </article>
      <Button variant={"outline"} asChild className="hover:bg-black hover:text-white">
        <Link href="/questions">
          開始
        </Link>
      </Button>
    </div>
  );
}
