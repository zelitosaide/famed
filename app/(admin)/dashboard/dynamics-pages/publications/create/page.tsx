import Breadcrumbs from "@/app/ui/breadcrumbs";
import { getDepartments } from "@/app/lib/web/data";
import CreatePublicationForm from "@/app/ui/publications/create-form";
 
export default async function Page() {
  const departaments = await getDepartments("", 1, 50);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Publicações", href: "/dashboard/dynamics-pages/publications" },
          {
            label: "Criar Publicação",
            href: "/dashboard/dynamics-pages/publications/create",
            active: true,
          },
        ]}
      />
      <CreatePublicationForm departaments={departaments} />
    </main>
  );
}