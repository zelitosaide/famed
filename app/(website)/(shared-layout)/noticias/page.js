import { getNews } from "@/app/api/server";
import News from "./news";

export default async function Page() {
  const news = await getNews();

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <h1>Notícias</h1>

      <News news={news} />
    </div>
  );
}