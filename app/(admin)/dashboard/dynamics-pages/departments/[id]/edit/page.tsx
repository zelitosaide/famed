import Breadcrumbs from "@/app/ui/breadcrumbs";
// import { notFound } from "next/navigation";
import { getDepartmentById } from "@/app/lib/web/data";
import EditDepartmentForm from "@/app/ui/departments/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const department = await getDepartmentById(id);
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
          { label: "Departamentos", href: "/dashboard/dynamics-pages/departments" },
          {
            label: "Editar Departamento",
            href: `/dashboard/dynamics-pages/departments/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditDepartmentForm department={department} />
    </main>
  );
}