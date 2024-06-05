import { Metadata } from "next";
import ClientPage from "./components/Page";

export const metadata: Metadata = {
  title: "檢查結果",
};

export default function Page() {
  return <ClientPage />;
}
