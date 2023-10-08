import { getContent } from "@/app/api/server";
import Content from "@/app/(website)/components/tip-tap/content";

export default async function Page() {
  const data = await getContent("extensao");

  return (
    <Content content={data.content} id={data._id} />
  );
}