import { getNews } from "@/app/lib/web/data";
import H1 from "@/app/ui/web/h1";
import Noticias from "@/app/ui/web/noticias/noticias";

export default async function Page() {
  const noticias = await getNews("", 1);

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>Notícias</H1>
      <Noticias noticias={noticias} />
    </div>
  );
}