import Breadcrumbs from "@/app/ui/breadcrumbs";
import CreateDepartmentForm from "@/app/ui/departments/create-form";
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Departamentos", href: "/dashboard/dynamics-pages/departments" },
          {
            label: "Criar Departamento",
            href: "/dashboard/dynamics-pages/departments/create",
            active: true,
          },
        ]}
      />
      <CreateDepartmentForm />
    </main>
  );
}