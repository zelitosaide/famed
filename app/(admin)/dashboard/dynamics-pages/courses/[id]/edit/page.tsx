import Breadcrumbs from "@/app/ui/breadcrumbs";
import { getCourseById } from "@/app/lib/web/data";
import EditCourseForm from "@/app/ui/courses/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const course = await getCourseById(params.id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Cursos", href: "/dashboard/dynamics-pages/courses" },
          {
            label: "Editar Curso",
            href: `/dashboard/dynamics-pages/courses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCourseForm course={course} />
    </main>
  );
}