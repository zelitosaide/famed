import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
// import { notFound } from "next/navigation";
import { getNewsById } from "@/app/lib/web/data";

const departaments = [
  "Dep. Ciências Fisiológicas",
  "Dep. Ciências Morfológicas",
  "Dep. Microbiologia",
  "Dep. Patologia",
  "Dep. Saúde da Comunidade",
  "Dep. Pediatria",
  "Dep. Medicina",
  "Dep. Cirurgia",
  "Dep. Ginecologia e Obstetrícia",
  "Unidade de Trauma e Violência",
  "Unidade de Ciências de Implementação e Apoio à Pesquisa em Saúde",
  "Unidade de Saúde Sexual e Reprodutiva e HIV/SIDA",
];
 
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