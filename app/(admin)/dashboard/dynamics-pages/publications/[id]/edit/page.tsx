import Breadcrumbs from "@/app/ui/breadcrumbs";
import { departaments, getPublicationById } from "@/app/lib/web/data";
import EditPublicationForm from "@/app/ui/publications/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const publication = await getPublicationById(params.id);

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