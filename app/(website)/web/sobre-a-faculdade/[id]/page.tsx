import { getContent, getDepartments } from "@/app/lib/web/data";
import Content from "@/app/ui/web/content";
import H1 from "@/app/ui/web/h1";
import Link from "next/link";

export default async function Page({ params }: any) {
  const data = await getContent(params.id);

  return params.id !== "departamentos-e-unidades" ? (
    <Content content={data.content} id={data._id} />
  ) : (
    <DepartamentosUnidades slug={params.id}  />
  );
}

async function DepartamentosUnidades({ slug }: { slug: string}) {
  const departaments = await getDepartments("", 1, 50);

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>departamentos e unidades</H1>
      <ul className="grid grid-cols-3 gap-x-5 gap-y-7">
        {departaments.map(function(dept: any) {
          return (
            <li key={dept._id} className="bg-[#ffffff] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd] flex flex-col">
              <Link
                className="p-3 text-base font-bold block text-[#178415] hover:underline"
                style={{ textDecorationThickness: 1.5 }}
                href={`/web/sobre-a-faculdade/${slug}/${dept._id}`}
              >
                {dept.title}
              </Link>
              <p style={{ fontSize: 15 }} className="p-3 text-zinc-500 bg-gray-50 flex-1">{dept.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}