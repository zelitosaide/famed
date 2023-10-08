import Link from "next/link";

export default function News({ news }) {
  return (
    <ul className="grid grid-cols-1 gap-y-7">
      {news.map(function(noticia) {
        return (
          <li 
            key={noticia._id}
            className="overflow-hidden bg-[#ffffff] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd]"
          >
            <div className="flex">
              {/* <img 
                className="shrink-0 w-40"
                src={`http://localhost:3001/${noticia.thumbnail}`}
              /> */}
              <div className="p-3">
                <Link
                  href={`/noticias/${noticia._id}`}
                  className="text-base font-bold pb-3 text-[#178415] hover:underline"
                >
                  {noticia.title}
                </Link>
                <p style={{ fontSize: 15 }} className="text-[#C7681C] pt-1">
                  Data da Publicação: 
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