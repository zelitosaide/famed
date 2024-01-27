import { fetchCoursesPages } from "@/app/lib/web/data";
import { CreateCourse } from "@/app/ui/courses/buttons";
import CoursesTable from "@/app/ui/courses/courses-table";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCoursesPages(query);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisar Cursos..." />
        <CreateCourse />
      </div>
      <Suspense key={query + currentPage} fallback={
        <p style={{ marginTop: 16 }} className="bg-gray-50 pl-4 pt-1 pb-1">
          Loading...
        </p>
      }>
        <CoursesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}