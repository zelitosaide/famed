import { formatDateToLocal } from "@/app/lib/utils";
import { getNews } from "@/app/lib/web/data";
import Link from "next/link";

// export default function Noticias({ noticias }: any) {
export default async function Noticias({ query, currentPage }: {
  query: string;
  currentPage: number;
}) {
  const noticias = await getNews(query, currentPage);

  return (
    <ul className="grid grid-cols-1 gap-y-7">
      {noticias.map(function(noticia: any) {
        return (
          <li 
            key={noticia._id}
            className="overflow-hidden bg-[#ffffff] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd]"
          >
            <div className="flex">
              <div className="p-3">
                <Link
                  href={`/web/noticias/${noticia._id}`}
                  style={{ textDecorationThickness: 1.5 }}
                  className="text-base font-bold pb-3 text-[#178415] hover:underline"
                >
                  {noticia.title}
                </Link>
                <p style={{ fontSize: 15 }} className="text-[#C7681C] pt-1">
                  Data da Publicação: {formatDateToLocal(noticia.createdAt, "pt-BR")}
                </p>
                <p style={{ fontSize: 15 }} className="text-zinc-500 pt-2">
                  {noticia.description}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}