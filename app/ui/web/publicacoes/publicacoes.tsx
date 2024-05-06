import { getPublications } from "@/app/lib/web/data";
import Link from "next/link";

// export default async function Publicacoes({ publicacoes }: any) {
export default async function Publicacoes({ query, currentPage }: {
  query: string;
  currentPage: number;
}) {
  const publicacoes = await getPublications(query, currentPage);

  return (
    <ul className="grid grid-cols-1 gap-y-7">
      {publicacoes.map(function(pub: any) {
        return (
          <li 
            key={pub._id}
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
  );
}