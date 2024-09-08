import Link from "next/link";
import H1 from "../ui/web/h1";

export default function CaixinhasPublicacoes({ publications }: any) {
  const formattedPublications = publications.map((p: any) => {
    return {
      id: p._id,
      title: p.title,
      url: p.url,
      authors: p.authors,
      review: p.review,
      pmid: p.pmid
    }
  }).slice(0, 4);

  return (
    <div className="pt-6 pr-7 pl-7 pb-10 mt-7 mb-10 bg-gray-50">
      <H1>Últimas Publicaçōes</H1>
      <ul className="grid grid-cols-2 gap-x-7 gap-y-7">
        {formattedPublications.map(function(pub: any) {
          return (
            <li 
              key={pub.id}
              className="p-3 bg-[#ffffff] divide-y divide-[#78ba78] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd]"
            >
              <Link 
                href={pub.url} 
                target="_blank"
                style={{ textDecorationThickness: 1.5 }}
                className="text-base font-bold pb-3 block text-[#178415] hover:underline"
              >
                {pub.title}
              </Link>
              <div style={{ fontSize: 15 }} className="pt-3 pb-2">
                <p className="text-zinc-500">
                  {pub.authors.join(", ")}
                </p>
                <p className="text-[#C7681C] pt-2 italic">
                  {pub.review}. PMID: {pub.pmid}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}