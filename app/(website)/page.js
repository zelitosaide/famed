import Link from "next/link";
import Carousel from "./components/carousel/carousel";
import { getNews } from "../api/server";

export default async function Page() {
  const news = await getNews();

  return (
    <main className="pl-28 pr-28">
      <div className="mt-8">
        <Carousel news={news} />
      </div>
      <Link href="/sobre-a-faculdade">Sobre</Link>
    </main>
  );
}