import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
// import { notFound } from "next/navigation";
import { departaments, getNewsById } from "@/app/lib/web/data";


 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const news = await getNewsById(id);
  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(id),
  //   fetchCustomers(),
  // ]);
  // if (!invoice) {
  //   notFound();
  // }

  // console.log(news);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Notícias", href: "/dashboard/invoices/news" },
          {
            label: "Editar Notícia",
            href: `/dashboard/invoices/news/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* <Form invoice={invoice} customers={customers} /> */}
      <Form news={news} departaments={departaments} />
    </main>
  );
}