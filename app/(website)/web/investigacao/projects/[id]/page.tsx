import { getProjectById } from "@/app/lib/web/data";
import Content from "@/app/ui/web/content";

export default async function Page({ params }: any) {
  const project = await getProjectById(params.id);

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <Content content={project.content} id={project._id} />
    </div>
  );
}