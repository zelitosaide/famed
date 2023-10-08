import { getCourses, getLinkByTitle } from "@/app/api/server";
import Link from "next/link";

export default async function Page() {
  const cursosCurtaDuracao = await getCourses();

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <h1>Cursos de curta duração</h1>
      <ul className="grid grid-cols-3 gap-x-5 gap-y-7">
        {cursosCurtaDuracao.map(function(curso) {
          return (
            <li key={curso._id} className="p-3 bg-[#ffffff] divide-y-4 divide-[#78ba78] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd]">
              <Link
                className="text-base font-bold pb-3 block text-[#178415] hover:underline"
                href={`/ensino/curta-duracao/${curso._id}`}
              >
                {curso.title}
              </Link>
              <p style={{ fontSize: 15 }} className="pt-3 pb-2 text-zinc-500">{curso.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}