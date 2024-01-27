import Breadcrumbs from "@/app/ui/breadcrumbs";
import CreateCourseForm from "@/app/ui/courses/create-form";
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Cursos", href: "/dashboard/dynamics-pages/courses" },
          {
            label: "Criar Curso",
            href: "/dashboard/dynamics-pages/courses/create",
            active: true,
          },
        ]}
      />
      <CreateCourseForm />
    </main>
  );
}