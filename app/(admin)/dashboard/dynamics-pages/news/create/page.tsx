import Breadcrumbs from "@/app/ui/breadcrumbs";
import { departaments } from "@/app/lib/web/data";
import CreateNewsForm from "@/app/ui/news/create-form";
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Notícias", href: "/dashboard/dynamics-pages/news" },
          {
            label: "Criar Notícia",
            href: "/dashboard/dynamics-pages/news/create",
            active: true,
          },
        ]}
      />
      <CreateNewsForm departaments={departaments} />
    </main>
  );
}