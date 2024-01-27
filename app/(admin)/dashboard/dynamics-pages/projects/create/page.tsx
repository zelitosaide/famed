import Breadcrumbs from "@/app/ui/breadcrumbs";
import CreateProjectForm from "@/app/ui/projects/create-form";
import { getDepartments } from "@/app/lib/web/data";
 
export default async function Page() {
  const departaments = await getDepartments("", 1, 50);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Projectos", href: "/dashboard/dynamics-pages/projects" },
          {
            label: "Criar Projecto",
            href: "/dashboard/dynamics-pages/projects/create",
            active: true,
          },
        ]}
      />
      <CreateProjectForm departaments={departaments} />
    </main>
  );
}