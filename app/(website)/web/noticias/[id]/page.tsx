import { getNewsById } from "@/app/lib/web/data";
import Content from "@/app/ui/web/content";

export default async function Page({ params }: any) {
  const noticia = await getNewsById(params.id);

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      {/* <H1>{noticia.title}</H1> */}
      <Content content={noticia.content} id={noticia._id} />
    </div>
  );
}