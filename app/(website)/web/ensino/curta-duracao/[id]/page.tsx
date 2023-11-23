import { getCourseById } from "@/app/lib/web/data";
import H1 from "@/app/ui/web/h1";

export default async function Page({ params }: any) {
  const curso = await getCourseById(params.id);

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>{curso.title}</H1>
    </div>
  );
}