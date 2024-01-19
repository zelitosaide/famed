import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import CreateProjectForm from "@/app/ui/projects/create-form";
import { departaments } from "@/app/lib/web/data";
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Projectos", href: "/dashboard/invoices/projects" },
          {
            label: "Criar Projecto",
            href: "/dashboard/invoices/projects/create",
            active: true,
          },
        ]}
      />
      <CreateProjectForm departaments={departaments} />
    </main>
  );
}