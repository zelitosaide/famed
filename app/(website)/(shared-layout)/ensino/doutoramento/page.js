import { getLinkByTitle } from "@/app/api/server";
import Link from "next/link";

export default async function Page() {
  const { children: ensino } = await getLinkByTitle("Ensino");
  const { children: doutoramento } = ensino.find(function(child) {
    return child.segment === "doutoramento";
  });

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <h1>Cursos de Doutoramento</h1>
      <ul className="grid grid-cols-3 gap-x-7 gap-y-7">
        {doutoramento.map(function(link) {
          return (
            <li key={link.segment} className="p-3 bg-[#ffffff] divide-y-4 divide-[#78ba78] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd]">
              <Link
                className="text-base font-bold pb-3 block text-[#178415] hover:underline"
                href={`/ensino/doutoramento/${link.segment}`}
              >
                {link.title}
              </Link>
              <p style={{ fontSize: 15 }} className="pt-3 pb-2 text-zinc-500">{link.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}