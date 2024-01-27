import Breadcrumbs from "@/app/ui/breadcrumbs";
import { departaments } from "@/app/lib/web/data";
import CreatePublicationForm from "@/app/ui/publications/create-form";
 
export default async function Page() {
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