import { formatDateToLocal } from "@/app/lib/utils";
import { getPublications, getPublicationsByYear } from "@/app/lib/web/data";
import Link from "next/link";

// export default async function Publicacoes({ publicacoes }: any) {
export default async function Publicacoes({
  query,
  currentPage,
  year,
}: {
  query: string;
  currentPage: number;
  year?: string;
}) {
  let publicacoes;
  if (year) {
    publicacoes = await getPublicationsByYear(query, currentPage, year);
  } else {
    publicacoes = await getPublications(query, currentPage);
  }

  return (
    <ul className="grid grid-cols-1 gap-y-7">
      {publicacoes.map(function (pub: any) {
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
              <p>
                {pub.publicationDate && (
                  <span className="inline-block bg-green-100 text-green-800 mb-2 px-2 py-1 rounded-full">
                    Data de Publicação: {formatDateToLocal(pub.publicationDate)}
                  </span>
                )}
              </p>
              <p className="text-zinc-500">
                <span>{pub.authors.join(", ")}</span>
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
