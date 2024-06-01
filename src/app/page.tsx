import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>《你以為你以為的就是你以為的嗎？》書中問題</h1>
      <article>
        TODO: Add descriptions here
      </article>
      <Button variant={"outline"} asChild>
        <Link href="/questions">
          開始
        </Link>
      </Button>
    </main>
  );
}
