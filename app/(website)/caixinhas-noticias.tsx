import Link from "next/link";
import H1 from "../ui/web/h1";
import { baseURL } from "../lib/web/data";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

export default function CaixinhasNoticias({ news }: any) {
  const formattedNews = news.map((n: any) => {
    return {
      id: n._id,
      title: n.title,
      description: n.description,
      image: n.image
    }
  }).slice(0, 4);

  return (
    <div className="pt-6 pr-7 pl-7 pb-10 mt-7 mb-10 bg-[#F2F8F2]">
      <div className="flex gap-2">
        <H1>Últimas Notícias</H1> 
        <Link
          // href="/web/investigacao/projects"
          href="/web/noticias"
          style={{
            textTransform: "uppercase",
            lineHeight: "2.1rem",
            fontWeight: 700,
            color: "#178415",
          }}
          className="hover:underline"
        >
          <span style={{ paddingRight: 8, display: "inline-block" }}>|</span>Mais Notícias <DoubleArrowRightIcon style={{
            display: "inline-block",
            marginBottom: 3
          }} />
        </Link>
        
      </div>
      <ul className="grid grid-cols-4 gap-x-7 gap-y-7">
        {formattedNews.map(function(n: any) {
          return (
            <li key={n.id} className="bg-[#ffffff] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd] flex flex-col">
              <img style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "top" }} src={`${baseURL}/${n.image}`} alt="" />
              <Link
                className="p-3 text-base font-bold block text-[#178415] hover:underline"
                style={{ textDecorationThickness: 1.5 }}
                href={`/web/noticias/${n.id}`}
              >
                {n.title}
              </Link>
              <p style={{ fontSize: 15 }} className="p-3 text-zinc-500 bg-gray-50 flex-1">{n.description.slice(0, 140)}...</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}