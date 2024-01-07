import { getContent } from "@/app/lib/web/data";
import Content from "@/app/ui/customers/content";

export default async function Page({ params }: any) {
  // console.log(params.id);
  const data = await getContent(params.id);
  const text = data.segment.split("-").join(" ");
  // documentos-e-regumentos-da-faculdade

  return (
    <>
      <p style={{ marginTop: 16 }} className="bg-gray-50 pl-4 pt-1 pb-1">
        <span className="uppercase">{text.slice(0, 1)}</span>{text.slice(1)}
      </p>
      <div style={{ marginTop: 24 }}>
        <Content content={data.content} id={data._id} />
      </div>
    </>
  );
}