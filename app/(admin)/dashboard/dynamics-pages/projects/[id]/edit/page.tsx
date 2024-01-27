import Breadcrumbs from "@/app/ui/breadcrumbs";
import { departaments, getProjectById } from "@/app/lib/web/data";
import EditProjectForm from "@/app/ui/projects/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const project = await getProjectById(params.id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Projectos", href: "/dashboard/dynamics-pages/projects" },
          {
            label: "Editar Projecto",
            href: `/dashboard/dynamics-pages/projects/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditProjectForm project={project} departaments={departaments} />
    </main>
  );
}