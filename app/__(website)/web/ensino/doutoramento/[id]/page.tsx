import { getContent } from "@/app/lib/web/data";
import Content from "@/app/ui/web/content";

export default async function Page({ params }: any) {
  const data = await getContent(params.id);

  return (
    <Content content={data.content} id={data._id} />
  );
}