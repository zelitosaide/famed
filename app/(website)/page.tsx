import { getNews, getPublications } from "../lib/web/data";
import Carousel from "../ui/web/carousel/carousel";
import Casa from "./casa";

export default async function Page() {
  const news = await getNews("", 1, 20);
  const publications = await getPublications("", 1, 20);

  return (
    <main className="pl-28 pr-28">
      <div className="mt-8">
        <Carousel news={news} />
      </div>
      <Casa news={news} publications={publications} />
    </main>
  );
}