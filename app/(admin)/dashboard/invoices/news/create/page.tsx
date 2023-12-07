import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";
import Form from "@/app/ui/news/create-form";
import { departaments } from "@/app/lib/web/data";
 
export default async function Page() {
  // const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Notícias", href: "/dashboard/invoices/news" },
          {
            label: "Criar Notícia",
            href: "/dashboard/invoices/news/create",
            active: true,
          },
        ]}
      />
      <Form departaments={departaments} />
    </main>
  );
}