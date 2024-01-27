import Breadcrumbs from "@/app/ui/breadcrumbs";
// import { notFound } from "next/navigation";
import { getDepartments, getNewsById } from "@/app/lib/web/data";
import EditNewsForm from "@/app/ui/news/edit-form";


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [news, departaments] = await Promise.all([
    getNewsById(id),
    getDepartments("", 1, 50),
  ]);

  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(id),
  //   fetchCustomers(),
  // ]);
  // if (!invoice) {
  //   notFound();
  // }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Notícias", href: "/dashboard/dynamics-pages/news" },
          {
            label: "Editar Notícia",
            href: `/dashboard/dynamics-pages/news/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditNewsForm news={news} departaments={departaments} />
    </main>
  );
}