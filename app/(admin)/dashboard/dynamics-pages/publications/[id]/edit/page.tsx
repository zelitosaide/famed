import Breadcrumbs from "@/app/ui/breadcrumbs";
import { getDepartments, getPublicationById } from "@/app/lib/web/data";
import EditPublicationForm from "@/app/ui/publications/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [publication, departaments] = await Promise.all([
    getPublicationById(id),
    getDepartments("", 1, 50),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Publicações", href: "/dashboard/dynamics-pages/publications" },
          {
            label: "Editar Publicação",
            href: `/dashboard/dynamics-pages/publications/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPublicationForm publication={publication} departaments={departaments} />
    </main>
  );
}