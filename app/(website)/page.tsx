import { getNews } from "../lib/web/data";
import Carousel from "../ui/web/carousel/carousel";

export default async function Page() {
  const news = await getNews();
  return (
    <main className="pl-28 pr-28">
      <div className="mt-8">
        <Carousel news={news} />
      </div>
    </main>
  );
}