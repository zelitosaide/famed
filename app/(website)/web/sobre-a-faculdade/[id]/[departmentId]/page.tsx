import { getDepartmentById } from "@/app/lib/web/data";
import Content from "@/app/ui/web/content";

export default async function Page({ params }: { params: { departmentId: string }}) {
  const department = await getDepartmentById(params.departmentId);

  return (
    <div>
      <Content content={department.content} id={department._id} />
    </div>
  );
}