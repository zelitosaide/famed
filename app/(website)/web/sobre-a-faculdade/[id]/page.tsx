import { departaments, getContent } from "@/app/lib/web/data";
import Content from "@/app/ui/web/content";
import H1 from "@/app/ui/web/h1";
import Link from "next/link";

export default async function Page({ params }: any) {
  const data = await getContent(params.id);

  return params.id !== "departamentos-e-unidades" ? (
    <Content content={data.content} id={data._id} />
  ) : (
    <DepartamentosUnidades />
  );
}

function DepartamentosUnidades() {
  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>departamentos e unidades</H1>
      <ul className="grid grid-cols-3 gap-x-5 gap-y-7">
        {departaments.map(function(dept: any) {
          return (
            <li key={dept} className="p-3 bg-[#ffffff] divide-y-4 divide-[#78ba78] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd]">
              <Link
                className="text-base font-bold pb-3 block text-[#178415] hover:underline"
                style={{ textDecorationThickness: 1.5 }}
                href={""}
              >
                {dept}
              </Link>
              <p style={{ fontSize: 15 }} className="pt-2 pb-2 text-zinc-500">{dept}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}