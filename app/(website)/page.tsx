import { getNews, getProjects, getPublications } from "../lib/web/data";
import Carousel from "../ui/web/carousel/carousel";
import CaixinhasNoticias from "./caixinhas-noticias";
import CaixinhasProjectos from "./caixinhas-projectos";
import CaixinhasPublicacoes from "./caixinhas-publicacoes";

export default async function Page() {
  const news = await getNews("", 1, 20);
  const publications = await getPublications("", 1, 20);
  const projects = await getProjects("", 1);

  return (
    <main className="pl-28 pr-28">
      <div className="mt-8">
        <Carousel news={news} />
      </div>
      <div className="bg-gray-50">
        <CaixinhasNoticias news={news} />
        <CaixinhasPublicacoes publications={publications} />
        <CaixinhasProjectos projects={projects} news={news} />
      </div>
    </main>
  );
}