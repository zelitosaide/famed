import { getContent } from "@/app/lib/web/data";
import Content from "@/app/ui/web/content";

export default async function Page() {
  const data = await getContent("extensao");

  return (
    <Content content={data.content} id={data._id} />
  );
}